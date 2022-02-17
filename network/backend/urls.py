from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from knox import views as knox_views

user_detail = views.UserViewSet.as_view({'get': 'retrieve'})


urlpatterns = [
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    path('posts/<int:pk>/like/', views.LikePost.as_view()),
    path('follow/<int:pk>/', views.Follow.as_view()),
    path('me/', views.UserAPI.as_view()),
    path('user/<str:name>/', user_detail),

    path('users/<str:username>/', views.SearchUsers.as_view()),

    path('register/', views.RegisterAPI.as_view()),
    path('login/', views.LoginAPI.as_view()),
    path('logout/', knox_views.LogoutView.as_view()),
    # path('logoutall/', knox_views.LogoutAllView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
