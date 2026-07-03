from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(AbstractUser):
    age = models.IntegerField(null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = "users"

class Products(models.Model):
    product_name = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    price = models.IntegerField()
    sales_price = models.IntegerField()
    product_category_code = models.CharField(max_length=50)

    class Meta:
        db_table = 'products'
    def __str__(self):
        return self.product_name

class Employees(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    job = models.CharField(max_length=50)
    pay = models.IntegerField()

    class Meta:
        db_table = 'employees'
    def __str__(self):
        return self.name

class Sales(models.Model):
    user_id = models.IntegerField()
    product_id = models.IntegerField()
    quantity = models.IntegerField()
    discount_rate = models.IntegerField()
    total_price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'sales'
    def __str__(self):
        return self.user_id

class Todos(models.Model):
    subject = models.CharField(max_length=50)
    checked = models.BooleanField(default=False)

    class Meta:
        db_table = 'todos'
    def __str__(self):
        return self.subject
