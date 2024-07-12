from django.db import models

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=100, null=True)
    precio = models.IntegerField(null=True)
    imagen = models.ImageField(null=True)

    def __str__(self):
        return f'{self.nombre} -> {self.precio}'
    

class Pedido(models.Model):
    fecha = models.DateField()
    cantidad = models.IntegerField()
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT)