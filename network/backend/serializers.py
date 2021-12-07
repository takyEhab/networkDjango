from rest_framework import serializers
from .models import Post, User, UserFollowing
from django.contrib.auth import authenticate


class FollowersSerializer(serializers.ModelSerializer):
    user_id = serializers.SlugRelatedField(
        read_only=True, slug_field="username")

    class Meta:
        model = UserFollowing
        fields = ("id", "user_id", "created")


class FollowingSerializer(serializers.ModelSerializer):
    following_user_id = serializers.SlugRelatedField(
        read_only=True, slug_field="username")

    class Meta:
        model = UserFollowing
        fields = ("id", "following_user_id", "created")


class UserSerializer(serializers.ModelSerializer):
    followers = FollowersSerializer(many=True, read_only=True)
    following = FollowingSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'followers', 'following')


class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        format='%d-%m-%Y %H:%M:%S', read_only=True)
    writer = serializers.SlugRelatedField(
        read_only=True, slug_field="username")

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['created_at',
                            'likes', 'id', 'writer', 'UsersLikes']


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def save(self):
        user = User(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Password must match.'})

        user.set_password(password)
        user.save()

        return user
