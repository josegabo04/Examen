from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='index'),
    path('productos/', views.productos, name ='productos'),
    path('contacto/', views.contacto, name ='contacto'),
    path('registro/', views.registro, name ='registro'),
    path('login/',views.iniciar_sesion, name='login'),
    path('pedido/',views.pedido, name='pedido'),
    path('logout/', views.cerrar_sesion, name='salir'),
    path('agregar/<int:producto_id>/',views.agregar_producto , name='agregar'),
    path('eliminar/<int:producto_id>/',views.eliminar_producto , name='eliminar'),
    path('restar/<int:producto_id>/',views.restar_producto , name='restar'),
    path('limpiar/',views.limpiar_carrito , name='limpiar'),
]