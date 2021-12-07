from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class UserFollowing(models.Model):
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="following")

    following_user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="followers")

    created = models.DateTimeField(auto_now_add=True)

    # add constraint so user cannot follow the same user twice
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user_id', 'following_user_id'],  name="unique_followers")
        ]

        ordering = ["-created"]

    def __str__(self):
        return f"{self.user_id} follows {self.following_user_id}"


class Post(models.Model):
    writer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="post")
    post = models.CharField(max_length=200)
    likes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    UsersLikes = models.ManyToManyField(
        User, blank=True, related_name="LikedPost")

    def __str__(self):
        return f"{self.writer}, {self.post}, {self.likes}, {self.created_at}, {self.UsersLikes}"

    class Meta:

        ordering = ["-created_at"]
