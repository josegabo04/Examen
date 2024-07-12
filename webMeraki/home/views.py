from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages

from home import Carrito
from .models import Producto

# Create your views here.
def home (request):
   
    return render(request,'index.html')

def productos(request):
    return render(request,'productos.html')
    

def contacto(request):
    return render(request,'contacto.html')

def pedido(request):
    productos = Producto.objects.all()
    data = {'productos':productos}
    return render(request,'pedido.html', data)

def registro(request):

    try:
        if request.method == 'POST':
            usuario = request.POST.get('usuario')
            contraseña1 = request.POST.get('password1')
            contraseña2 = request.POST.get('password2')
            correo = request.POST.get('correo')

            if contraseña1 == contraseña2:
                user = User.objects.create_user(username=usuario, email=correo,password=contraseña1)
                user.save()
                messages.success(request,"Usuario creado correctamente")
                return render(request,'login.html')
            else:
                return render(request,'registro.html',{'mensaje':'contraseñas no coninciden'})

        elif request.method =='GET':
            return render(request,'registro.html')
    except IntegrityError:
        return render(request,'registro.html', {'mensaje':'Usuario ya existe ! '})
    except Exception as error:
        print(error)
    

def iniciar_sesion(request):
   
    try:
        if request.method == 'POST':
            usuario = request.POST.get('usuario')
            contraseña = request.POST.get('password')
            user = authenticate(request,username = usuario, password = contraseña)
            if user is not None:
                login(request,user)
                return render(request,'index.html')
            else:
                return render(request,'login.html',{'mensaje':'Usuario o contraseña incorrectos'})
        elif request.method == 'GET':
            return render(request,'login.html')
    except IntegrityError:
        return render(request,'login.html',{'mensaje':'Usuario o contraseña incorrectos'})



def cerrar_sesion(request):
    logout(request)
    return redirect('index')


def agregar_producto(request, producto_id):
    carro= Carrito(request)
    producto = Producto.objects.get(id=producto_id)
    carro.agregar(producto)
    return redirect('pedido.html')

def eliminar_producto(request, producto_id):
    carrito = Carrito(request)
    producto = Producto.objects.get(id=producto_id)
    carrito.eliminar(producto)
    return redirect('pedido.html')

def restar_producto(request, producto_id):
    carrito = Carrito(request)
    producto = Producto.objects.get(id=producto_id)
    carrito.restar(producto)
    return redirect('pedido.html')

def limpiar_carrito(request):
    carro = Carrito(request)
    carro.limpiar()
    carro
    return redirect('pedido.html') 