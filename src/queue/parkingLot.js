const Queue = require("../queue/queue");

/**
 * Implement a Parking Lot.
 *
 */
class ParkingLot {
  constructor(capacity, rate) {
    this.spaces = new Array(capacity).fill("vacant");
    this.rate = rate;
    this.revenue = 0;
    this.queue = new Queue();
  }

  /**
   * Returns the number of vacant parking spaces
   * @returns {Number}
   *  the total number of spaces where the value is "vacant".
   */

  get vacantSpaces() {
    return this.spaces.reduce(
      (sum, space, index) => sum + (space === "vacant" ? 1 : 0),
      0
    );
  }

  /**
   * As cars enter the parking lot, the license plate number is entered and the car is parked in the first vacant space.
   * If the lot is full, the car is added to the queue to be parked when a spot is available.
   *
   * @param licensePlateNumber
   *  the license plate number of the car entering
   */
  enter(licensePlateNumber) {
    if (this.vacantSpaces > 0) {
      const index = this.spaces.indexOf("vacant");
      this.spaces[index] = licensePlateNumber;
    } else {
      this.queue.enqueue(licensePlateNumber);
    }
  }


  /**
   * As a car leaves the parking lot, or the queue, the leave method is called with the license plate number of the car leaving.
   * @param licensePlateNumber
   *    *  the license plate number of the car leaving.
   */
  leave(licensePlateNumber) {
    // check if license plate number is in an occupied space
    if (!this.spaces.includes(licensePlateNumber)) {
        // If not in an occupied space, dequeue the vehicle from the waiting queue
        let removeFromQueue = new Queue();

        // Iterate through the queue to dequeue and filter out the specified license plate number
        while (this.queue.first) {
            const dequeued = this.queue.dequeue();

            // If the dequeued vehicle is not the one leaving, enqueue it to the new queue
            if (licensePlateNumber !== dequeued) {
                removeFromQueue.enqueue(dequeued);
            }
        }

        // Update the parking lot's queue to the modified queue without the departing vehicle
        this.queue = removeFromQueue;
    } else if (this.spaces.includes(licensePlateNumber)) {
        // If the vehicle is leaving from an occupied space
        const index = this.spaces.indexOf(licensePlateNumber);

        // Mark the space as "vacant"
        this.spaces[index] = "vacant";

        // Increase revenue based on the parking rate
        this.revenue += this.rate;

        // Check if there are vehicles waiting in the queue
        if (!this.queue.isEmpty()) {
            // If there are vehicles in the queue, allow the next vehicle to enter the parking lot
            this.enter(this.queue.dequeue());
        }
    }
}

  /**
   * Lists each space in the parking lot along with the license plate number of the car parked there, or
   * "vacant" as the license plate if the spot is vacant.
   * @returns {{licensePlateNumber: string, space: Number}[]}
   */
  get occupants() {
    return this.spaces.map((licensePlateNumber, index) => ({
      space: index + 1,
      licensePlateNumber,
    }));
  }

  /**
   * The total cumulative revenue for the parking lot. The parking rate is paid when the car leaves, it does not matter how long the car stays in the spot.
   * @returns {number}
   *  the total revenue for the parking lot.
   */
  get totalRevenue() {
    return this.revenue;
  }
}

module.exports = ParkingLot;
