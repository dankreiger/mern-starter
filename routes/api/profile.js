import express from 'express';
const router = express.Router();
import passport from 'passport';

// Load Validation
import validateProfileInput from '../../validation/profile';
import validateExperienceInput from '../../validation/experience';
import validateEducationInput from '../../validation/education';

// Load Profile Model
import Profile from '../../models/Profile';
// Load User Profile
import User from '../../models/User';

// @route  GET api/profile/test
// @desc   Tests profile route
// @access Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Profile Works'
  })
);

// @route  GET api/profile
// @desc   Get current user's profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const errors = {};
    Profile.findOne({
      user: req.user.id
    })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  GET api/profile/all
// @desc   Get all profiles
// @access Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .populate()
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({
        profile: 'There are no profiles'
      })
    );
});

// @route  GET api/profile/handle/:handle
// @desc   Get profile by handle
// @access Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({
    handle: req.params.handle
  })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({
    user: req.params.user_id
  })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({
        profile: 'There is no profile for this user'
      })
    );
});

// @route  POST api/profile
// @desc   Create or Edit user profile
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    const {
      bio,
      facebook,
      githubusername,
      handle,
      instagram,
      company,
      linkedin,
      location,
      skills,
      status,
      twitter,
      website,
      youtube
    } = req.body;

    if (handle) profileFields.handle = handle;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (typeof skills !== 'undefined') {
      profileFields.skills = skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: profileFields
          },
          {
            new: true
          }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route  POST api/profile/experience
// @desc   Add experience to profile
// @access Private
router.post(
  '/experience',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      const { company, current, description, from, location, to } = req.body;
      const newExp = {
        company,
        location,
        from,
        to,
        current,
        description
      };

      // Add to experience array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route  POST api/profile/education
// @desc   Add education to profile
// @access Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const {
        school,
        current,
        description,
        from,
        fieldofstudy,
        degree,
        title,
        to
      } = req.body;
      const newEdu = {
        title,
        school,
        fieldofstudy,
        degree,
        from,
        to,
        current,
        description
      };

      // Add to experience array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

module.exports = router;
