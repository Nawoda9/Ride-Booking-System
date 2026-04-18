/**
 * @openapi
 * /payments:
 *   post:
 *     summary: Create payment for a booking
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bookingId, amount]
 *             properties:
 *               bookingId: { type: string, format: uuid }
 *               amount: { type: number }
 *               method: { type: string, example: card }
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Invalid booking
 *   get:
 *     summary: List all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: OK
 *
 * /payments/booking/{bookingId}:
 *   get:
 *     summary: Payments by booking ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: OK
 *
 * /payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: OK
 *
 * /payments/{id}/status:
 *   patch:
 *     summary: Update payment status
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, paid, failed]
 *     responses:
 *       200:
 *         description: OK
 */

module.exports = {};
