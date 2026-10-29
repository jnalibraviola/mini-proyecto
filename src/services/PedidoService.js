import { DescuentoNormal } from '../descuentos/DescuentoNormal.js';
import { DescuentoPremium } from '../descuentos/DescuentoPremium.js';
import { DescuentoVip } from '../descuentos/DescuentoVip.js';
import { DescuentoMayorista } from '../descuentos/DescuentoMayorista.js';

import { EnvioNormal } from '../envios/EnvioNormal.js';
import { EnvioExpress } from '../envios/EnvioExpress.js';
import { EnvioLocal } from '../envios/EnvioLocal.js';

export class PedidoService {
  // Recibimos las dependencias desde afuera de forma opcional
  constructor(
    estrategiasDescuento = {
      normal: new DescuentoNormal(),
      premium: new DescuentoPremium(),
      vip: new DescuentoVip(),
      mayorista: new DescuentoMayorista()
    },
    estrategiasEnvio = {
      normal: new EnvioNormal(),
      express: new EnvioExpress(),
      local: new EnvioLocal()
    }
  ) {
    // Asignamos las dependencias recibidas
    this.descuentos = estrategiasDescuento;
    this.envios = estrategiasEnvio;
    this.pedidos = [];
  }

  registrar(pedido, tipoCliente, tipoEnvio) {
    let total = 0;

    for (const producto of pedido.productos) {
      total += producto.precio;
    }

    const estrategiaDescuento = this.descuentos[tipoCliente];
    if (estrategiaDescuento) {
      total = estrategiaDescuento.calcular(total);
    }

    const estrategiaEnvio = this.envios[tipoEnvio];
    if (estrategiaEnvio) {
      total += estrategiaEnvio.obtenerCosto();
    }

    this.pedidos.push({ pedido, total });

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("pedidos", JSON.stringify(this.pedidos));
    }
    
    console.log(`Email enviado a ${pedido.cliente.email}`);

    return total;
  }
}