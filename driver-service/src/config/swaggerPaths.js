/**
 * @openapi
 * /drivers:
 *   post:
 *     summary: Create driver
 *     tags: [Drivers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, phone]
 *             properties:
 *               name: { type: string }
 *               phone: { type: string }
 *               vehicleInfo: { type: string }
 *               licenseNumber: { type: string }
 *               availability: { type: string, enum: [online, offline] }
 *     responses:
 *       201:
 *         description: Created
 *   get:
 *     summary: List all drivers
 *     tags: [Drivers]
 *     responses:
 *       200:
 *         description: OK
 *
 * /drivers/{id}:
 *   get:
 *     summary: Get driver by ID
 *     tags: [Drivers]
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
 *   put:
 *     summary: Update driver
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               phone: { type: string }
 *               vehicleInfo: { type: string }
 *               licenseNumber: { type: string }
 *               availability: { type: string, enum: [online, offline] }
 *     responses:
 *       200:
 *         description: OK
 *   delete:
 *     summary: Delete driver
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: OK
 *
 * /drivers/{id}/availability:
 *   patch:
 *     summary: Set driver online/offline
 *     tags: [Drivers]
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
 *             required: [availability]
 *             properties:
 *               availability: { type: string, enum: [online, offline] }
 *     responses:
 *       200:
 *         description: OK
 */

module.exports = {};
