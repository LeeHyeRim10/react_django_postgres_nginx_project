from django.urls import path, include

from app.views import (
    EmployeesApiView,
    ProductApiView,
    UserAPIView,
    LoginView,
    MeView,
    RefreshView, SalesApiView, TodosApiView,
)

urlpatterns = [
    path("auth/login/", LoginView.as_view()),
    path("auth/me/", MeView.as_view()),
    path("auth/refresh/", RefreshView.as_view()),

    path("users/", UserAPIView.as_view()),  # GET all / POST
    path("users/<int:id>/", UserAPIView.as_view()),  # GET one / PUT / DELETE

    path("products/", ProductApiView.as_view()),
    path("products/<int:id>/", ProductApiView.as_view()),

    path("employees/", EmployeesApiView.as_view()),
    path("employees/<int:id>/", EmployeesApiView.as_view()),

    path("sales/", SalesApiView.as_view()),
    path("sales/<int:id>/", SalesApiView.as_view()),

    path("todos/", TodosApiView.as_view()),
    path("todos/<int:id>/", TodosApiView.as_view()),
]
