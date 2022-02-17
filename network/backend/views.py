from unicodedata import name
from .models import Post, User, UserFollowing
# from django.contrib.auth.models import User
from .serializers import PostSerializer, UserSerializer, RegisterSerializer, LoginSerializer
from rest_framework import generics, viewsets, permissions, status
from django.http import Http404
from django.db.models import F
from django.db import transaction, IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
# from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import APIException
from django.shortcuts import get_object_or_404


success = Response({"status": "success"}, status=status.HTTP_200_OK)
    

class SearchUsers(generics.ListAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        username = self.kwargs['username']
        return User.objects.filter(username__contains=username)

        # return User.objects.all()


class UserViewSet(viewsets.ViewSet):
    def retrieve(self, request, name=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, username=name)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class LikePost(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk, format=None):
        post = Post.objects.filter(pk=pk)
        LikedByUser = Post.objects.filter(UsersLikes=request.user.id)

        if LikedByUser.filter(pk=pk).exists():
            # remove like
            Post.objects.get(pk=pk).UsersLikes.remove(request.user)
            post.update(likes=F('likes') - 1)
            return success
        else:
            # add like
            post.update(likes=F('likes') + 1)
            Post.objects.get(pk=pk).UsersLikes.add(request.user)

            return success


class Follow(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk, format=None):

        # Follow
        try:
            # UserFollowing.objects.get()
            user = User.objects.get(pk=pk)

            if UserFollowing.objects.filter(user_id=request.user, following_user_id=user).exists():
                # user = User.objects.get(pk=pk)
                UserFollowing.objects.filter(
                    user_id=request.user, following_user_id=user).delete()
                return Response({"status": "User Unfollowed"})

            else:

                # user = User.objects.get(pk=pk)
                UserFollowing.objects.create(
                    user_id=request.user, following_user_id=user)
                return Response({"status": "User Followed"})

        except User.DoesNotExist:
            raise Http404

        # try:
        #     user = User.objects.get(pk=pk)
        #     UserFollowing.objects.create(
        #         user_id=request.user, following_user_id=user)
        #     return success

        # except IntegrityError:
        #     # do something
        #     return Response({"error": "user is already followed"})
        # except User.DoesNotExist:

        #     return Response({"error": "user doesn't exist"})

        # except Exception as e:
        #     raise e

    # def delete(self, request, pk, format=None):
    #     # Unfollow
    #     try:
    #         user = User.objects.get(pk=pk)
    #         UserFollowing.objects.filter(
    #             user_id=request.user, following_user_id=user).delete()
    #         return success
    #     except User.DoesNotExist:
    #         return Response({"error": "user doesn't exist"})


class PostList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(writer=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_update(self, serializer, *args, **kwargs):
        pk = self.kwargs.get('pk')

        if Post.objects.get(pk=pk).writer == self.request.user:
            serializer.save()
        else:
            raise APIException("Only post writer can update the post")

    def destroy(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')

        if Post.objects.get(pk=pk).writer == self.request.user:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(data={"message": "Only post writer can delete the post."}, status=status.HTTP_400_BAD_REQUEST)


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login API


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })
