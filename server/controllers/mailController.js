const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

exports.sendEmail = async (req, res) => {
    const { name, email, subject, text } = req.body; 

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'Kredbic.yt@gmail.com',
        pass: process.env.EMAILPASS,
      },
    });
  
    const mailOptions = {
      from: email,
      to: 'Kredbic.yt@gmail.com', 
      subject: subject,
      text: `From (email): ${email}\nFrom (name): ${name}\nSubject: ${subject}\n\nMessage:\n${text}`, 
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send({ message: 'Email sent!' });
    } catch (error) {
      console.error(error); 
      res.status(500).send({ message: 'Failed to send email' });
    }
};
