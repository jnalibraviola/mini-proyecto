import { DescuentoNormal } from '../descuentos/DescuentoNormal.js';
import { DescuentoPremium } from '../descuentos/DescuentoPremium.js';
import { DescuentoVip } from '../descuentos/DescuentoVip.js';

import { EnvioNormal } from '../envios/EnvioNormal.js';
import { EnvioExpress } from '../envios/EnvioExpress.js';
import { EnvioLocal } from '../envios/EnvioLocal.js';

export class PedidoService {
  constructor() {
    // 1. Usamos los nombres correctos que importamos
    this.descuentos = {
      normal: new DescuentoNormal(),
      premium: new DescuentoPremium(),
      vip: new DescuentoVip()
    };

    this.envios = {
      normal: new EnvioNormal(),
      express: new EnvioExpress(),
    };

    this.pedidos = [];
  }

  registrar(pedido, tipoCliente, tipoEnvio) {
    let total = 0;

    for (const producto of pedido.productos) {
      total += producto.precio;
    }

    // 2. Aplicamos el descuento usando la estrategia correspondiente (sin if/else)
    const estrategiaDescuento = this.descuentos[tipoCliente];
    if (estrategiaDescuento) {
      total = estrategiaDescuento.calcular(total); // Asumiendo que tu clase tiene un método calcular()
    }

    // 3. Aplicamos el envío usando la estrategia correspondiente (sin if/else)
    const estrategiaEnvio = this.envios[tipoEnvio];
    if (estrategiaEnvio) {
      total += estrategiaEnvio.obtenerCosto(); // Asumiendo que tu clase tiene un método obtenerCosto()
    }

    this.pedidos.push({ pedido, total });

    // Nota: localStorage no existe de forma nativa en Node.js (si corres tests, requerirá un mock)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("pedidos", JSON.stringify(this.pedidos));
    }
    
    console.log(`Email enviado a ${pedido.cliente.email}`);

    return total;
  }
}
