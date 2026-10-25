import { DescuentoNormal } from './descuentos/descuentoNormal.js';
import { DescuentoPremium } from './descuentos/descuentoPremium.js';
import { DescuentoVip } from './descuentos/descuentoVip.js';

import { EnvioNormal } from './envios/envioNormal.js';
import { EnvioExpress } from './envios/envioExpress.js';

export class PedidoService {
  constructor() {
    this.descuentos = {
      normal: new normal(),
      premium: new premium(),
      vip: new vip()
    };
    this.pedidos = [];
  }

  registrar(pedido, tipoCliente, tipoEnvio) {
    let total = 0;

    for (const producto of pedido.productos) {
      total += producto.precio;
    }

    if (tipoCliente === "premium") {
      total *= 0.9;
    }

    if (tipoCliente === "vip") {
      total *= 0.8;
    }

    let costoEnvio = 0;

    if (tipoEnvio === "normal") {
      costoEnvio = 1000;
    }

    if (tipoEnvio === "express") {
      costoEnvio = 2000;
    }

    total += costoEnvio;
    this.pedidos.push({ pedido, total });

    localStorage.setItem("pedidos", JSON.stringify(this.pedidos));
    console.log(`Email enviado a ${pedido.cliente.email}`);

    return total;
  }
}
