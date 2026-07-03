from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken

from .models import Users


class CustomJWTAuthentication(JWTAuthentication):

    def get_user(self, validated_token):

        try:
            return Users.objects.get(id=validated_token["user_id"])
        except Users.DoesNotExist:
            raise InvalidToken("User not found")