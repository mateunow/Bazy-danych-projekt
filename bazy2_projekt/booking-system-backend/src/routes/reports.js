const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Resource = require('../models/Resource');
const User = require('../models/User');

// Raport rezerwacji zasobów
router.get('/usage', async (req, res) => {
  try {
    const results = await Reservation.aggregate([
      {
        $group: {
          _id: '$resourceId',
          totalReservations: { $sum: 1 },
          users: { $addToSet: '$userId' }
        }
      },
      {
        $lookup: {
          from: 'resources',
          localField: '_id',
          foreignField: '_id',
          as: 'resource'
        }
      },
      {
        $unwind: '$resource'
      },
      {
        $project: {
          _id: 0,
          resourceName: '$resource.name',
          resourceType: '$resource.type',
          totalReservations: 1,
          totalUniqueUsers: { $size: '$users' }
        }
      },
      { $sort: { totalReservations: -1 } }
    ]);

    res.json(results);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Raport o aktywności użytkownika 
router.get('/user-activity', async (req, res) => {
  try {
    const data = await Reservation.aggregate([
      {
        $group: {
          _id: '$userId',
          totalReservations: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
            }
          },
          lastReservation: { $max: '$startTime' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'logs',
          localField: '_id',
          foreignField: 'userId',
          as: 'userLogs'
        }
      },
      {
        $project: {
          _id: 0,
          userId: '$user._id',
          name: '$user.name',
          email: '$user.email',
          totalReservations: 1,
          completed,
          lastReservation: 1,
          logCount: { $size: '$userLogs' }
        }
      },
      { $sort: { totalReservations: -1 } }
    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;