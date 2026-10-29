import { describe, expect, test } from "@jest/globals";
import { Producto } from "../src/models/Producto.js";
import { Pedido } from "../src/models/Pedido.js"; 
import { PedidoService } from "../src/services/PedidoService.js";

test("cliente premium recibe 10% de descuento sobre los productos", () => {
    const pedido = new Pedido(
      { nombre: "Carlos", email: "carlos@example.com" },
      [new Producto(1, "Mochila", 10000)]
    );
    const service = new PedidoService();
    
    // Subtotal: 10000 - 10% = 9000 + Envío normal (1000) = 10000
    const total = service.registrar(pedido, "premium", "normal");
    expect(total).toBe(10000);
  });

  test("cliente VIP recibe 20% de descuento sobre los productos", () => {
    const pedido = new Pedido(
      { nombre: "Lucía", email: "lucia@example.com" },
      [new Producto(1, "Zapatillas", 20000)]
    );
    const service = new PedidoService();
    
    // Subtotal: 20000 - 20% = 16000 + Envío normal (1000) = 17000
    const total = service.registrar(pedido, "vip", "normal");
    expect(total).toBe(17000);
  });

  test("envio express agrega 2000", () => {
    const pedido = new Pedido(
      { nombre: "Pedro", email: "pedro@example.com" },
      [new Producto(1, "Libro", 5000)]
    );
    const service = new PedidoService();
    
    // Subtotal: 5000 (normal) + Envío express (2000) = 7000
    const total = service.registrar(pedido, "normal", "express");
    expect(total).toBe(7000);
  });

  test("el descuento no se aplica al costo de envio", () => {
    const pedido = new Pedido(
      { nombre: "Sofía", email: "sofia@example.com" },
      [new Producto(1, "Tablet", 10000)]
    );
    const service = new PedidoService();
    
    // VIP: 10000 - 20% = 8000. Envío express: 2000. Total esperado: 10000.
    const total = service.registrar(pedido, "vip", "express");
    expect(total).toBe(10000);
  });

  test("combina distintos tipos de cliente y envio", () => {
    const pedido = new Pedido(
      { nombre: "Mateo", email: "mateo@example.com" },
      [new Producto(1, "Monitor", 50000)]
    );
    const service = new PedidoService();
    
    // Premium: 50000 - 10% = 45000. Envío express: 2000. Total: 47000.
    const total = service.registrar(pedido, "premium", "express");
    expect(total).toBe(47000);
  });

  test("pedido mayorista con envio local", () => {
    const pedido = new Pedido(
      { nombre: "Ana", email: "ana@example.com" },
      [new Producto(1, "Notebook", 100000)]
    );
    const service = new PedidoService();
    
    // Mayorista: 100000 - 5% = 95000. Envío local: 500. Total: 95500.
    const total = service.registrar(pedido, "mayorista", "local");
    expect(total).toBe(95500);
  });
