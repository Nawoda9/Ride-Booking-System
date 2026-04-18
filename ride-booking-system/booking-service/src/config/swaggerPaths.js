/**
 * @openapi
 * /bookings:
 *   post:
 *     summary: Create booking (links passenger + assigned driver)
 *     tags: [Bookings]
 *     description: Validates user via User Service; assigns first online driver from Driver Service or a mock id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, pickup, dropoff]
 *             properties:
 *               userId: { type: string, format: uuid }
 *               pickup: { type: string }
 *               dropoff: { type: string }
 *               fare: { type: number }
 *               driverId: { type: string, format: uuid, description: Optional override }
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *   get:
 *     summary: List all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: OK
 *
 * /bookings/user/{userId}:
 *   get:
 *     summary: Bookings for a user
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: OK
 *
 * /bookings/driver/{driverId}:
 *   get:
 *     summary: Bookings for a driver
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: driverId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: OK
 *
 * /bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
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
 *     summary: Delete booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: OK
 *
 * /bookings/{id}/status:
 *   patch:
 *     summary: Update booking status
 *     tags: [Bookings]
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
 *                 enum: [requested, accepted, ongoing, completed, cancelled]
 *     responses:
 *       200:
 *         description: OK
 */

module.exports = {};
