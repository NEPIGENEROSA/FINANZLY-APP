// Estructura de datos para una transacción
// Esto asegura que cada movimiento tenga lo necesario (Paso 12)
class Transaction {
    constructor(id, description, amount, date = new Date()) {
        this.id = id;
        this.description = description;
        this.amount = amount; // Positivo para ingresos, negativo para gastos
        this.date = date;
    }
}

module.exports = Transaction;