from rest_framework import serializers, status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Users, Products, Employees, Sales, Todos
from .seriallizer import UserSerializer, LoginSerializer, ProductSerializer, EmployeeSerializer, SalesSerializer, \
    TodoSerializer

from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password

from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

# todos CRUD
class TodosApiView(APIView):

    # GET /todos/ (전체 조회)
    # GET /todos/{id}/ (단건 조회)
    def get(self, request, id=None):

        if id:
            try:
                todos = Todos.objects.get(id=id)
            except Todos.DoesNotExist:
                return Response(
                    {"message": "Todos not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = TodoSerializer(todos)
            return Response(serializer.data)

        todos = Todos.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    # POST /todos/ (생성)
    def post(self, request):

        data = request.data.copy()

        serializer = TodoSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # PUT /sales/{id}/ (수정)
    def put(self, request, id):

        try:
            todos = Todos.objects.get(id=id)
        except Todos.DoesNotExist:
            return Response(
                {"message": "Todos not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        data = request.data.copy()

        serializer = TodoSerializer(todos, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE /todos/{id}/ (삭제)
    def delete(self, request, id):

        try:
            todos = Todos.objects.get(id=id)
        except Todos.DoesNotExist:
            return Response(
                {"message": "Todos not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        todos.delete()

        return Response(
            {"id": id, "message": "deleted"},
            status=status.HTTP_204_NO_CONTENT
        )

# sales CRUD
class SalesApiView(APIView):

    # GET /sales/ (전체 조회)
    # GET /sales/{id}/ (단건 조회)
    def get(self, request, id=None):

        if id:
            try:
                sales = Sales.objects.get(id=id)
            except Sales.DoesNotExist:
                return Response(
                    {"message": "Sales not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = SalesSerializer(sales)
            return Response(serializer.data)

        sales = Sales.objects.all()
        serializer = SalesSerializer(sales, many=True)
        return Response(serializer.data)

    # POST /sales/ (생성)
    def post(self, request):

        data = request.data.copy()

        serializer = SalesSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # PUT /sales/{id}/ (수정)
    def put(self, request, id):

        try:
            sales = Sales.objects.get(id=id)
        except Sales.DoesNotExist:
            return Response(
                {"message": "Sales not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        data = request.data.copy()

        serializer = SalesSerializer(sales, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE /sales/{id}/ (삭제)
    def delete(self, request, id):

        try:
            sales = Sales.objects.get(id=id)
        except Sales.DoesNotExist:
            return Response(
                {"message": "Sales not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        sales.delete()

        return Response(
            {"id": id, "message": "deleted"},
            status=status.HTTP_204_NO_CONTENT
        )

# employees CRUD
class EmployeesApiView(APIView):

    # GET /employees/ (전체 조회)
    # GET /employees/{id}/ (단건 조회)
    def get(self, request, id=None):

        if id:
            try:
                employees = Employees.objects.get(id=id)
            except Employees.DoesNotExist:
                return Response(
                    {"message": "Employees not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = EmployeeSerializer(employees)
            return Response(serializer.data)

        employees = Employees.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    # POST /employees/ (생성)
    def post(self, request):

        data = request.data.copy()

        serializer = EmployeeSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        obj = serializer.save()

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # PUT /employees/{id}/ (수정)
    def put(self, request, id):

        try:
            employees = Employees.objects.get(id=id)
        except Employees.DoesNotExist:
            return Response(
                {"message": "Employees not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        data = request.data.copy()

        serializer = EmployeeSerializer(employees, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE /employees/{id}/ (삭제)
    def delete(self, request, id):

        try:
            employees = Employees.objects.get(id=id)
        except Employees.DoesNotExist:
            return Response(
                {"message": "Employees not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        employees.delete()

        return Response(
            {"id": id, "message": "deleted"},
            status=status.HTTP_204_NO_CONTENT
        )

# products CRUD
class ProductApiView(APIView):

    # GET /products/ (전체 조회)
    # GET /products/{id}/ (단건 조회)
    def get(self, request, id=None):

        if id:
            try:
                products = Products.objects.get(id=id)
            except Products.DoesNotExist:
                return Response(
                    {"message": "Products not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = ProductSerializer(products)
            return Response(serializer.data)

        products = Products.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    # POST /products/ (생성)
    def post(self, request):

        data = request.data.copy()

        serializer = ProductSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # PUT /products/{id}/ (수정)
    def put(self, request, id):

        try:
            products = Products.objects.get(id=id)
        except Products.DoesNotExist:
            return Response(
                {"message": "Products not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        data = request.data.copy()

        serializer = ProductSerializer(products, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE /products/{id}/ (삭제)
    def delete(self, request, id):

        try:
            products = Products.objects.get(id=id)
        except Products.DoesNotExist:
            return Response(
                {"message": "Products not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        products.delete()

        return Response(
            {"id": id, "message": "deleted"},
            status=status.HTTP_204_NO_CONTENT
        )

# auth login/register
class LoginView(APIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):

        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        try:
            user = Users.objects.get(username=username)
        except Users.DoesNotExist:
            return Response(
                {"message": "아이디 또는 비밀번호가 틀렸습니다."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not check_password(password, user.password):
            return Response(
                {"message": "아이디 또는 비밀번호가 틀렸습니다."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken()

        refresh["user_id"] = user.id

        return Response({
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
        })


class MeView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "age": user.age,
            "city": user.city,
        })


class RefreshView(TokenRefreshView):
    pass

# user CRUD
class UserAPIView(APIView):

    # GET /users/ (전체 조회)
    # GET /users/{id}/ (단건 조회)
    def get(self, request, id=None):

        if id:
            try:
                user = Users.objects.get(id=id)
            except Users.DoesNotExist:
                return Response(
                    {"message": "User not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

            serializer = UserSerializer(user)
            return Response(serializer.data)

        users = Users.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    # POST /users/ (생성)
    def post(self, request):

        data = request.data.copy()

        # 비밀번호 암호화
        if "password" in data:
            data["password"] = make_password(data["password"])

        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # PUT /users/{id}/ (수정)
    def put(self, request, id):

        try:
            user = Users.objects.get(id=id)
        except Users.DoesNotExist:
            return Response(
                {"message": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        data = request.data.copy()

        # 비밀번호 수정 시에도 암호화
        if "password" in data:
            data["password"] = make_password(data["password"])

        serializer = UserSerializer(user, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE /users/{id}/ (삭제)
    def delete(self, request, id):

        try:
            user = Users.objects.get(id=id)
        except Users.DoesNotExist:
            return Response(
                {"message": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        user.delete()

        return Response(
            {"id": id, "message": "deleted"},
            status=status.HTTP_204_NO_CONTENT
        )