# pre-hackstoric-email-service
Email service Cloud Functions for Pre Hackstoric hackathon

## Add email Cloud Function

This cloud function allows for adding emails to the mailing listing and stores these emails in Cloud SQL.

## Send email Cloud Function

This cloud function sends emails through the Twilio Sendgrid API and is triggered by a Cloud Scheduler that pushes to a Cloud Pub-Sub topic. The email data is received from Cloud SQL.