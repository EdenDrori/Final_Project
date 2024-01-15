import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import ROUTES from "../../routes/ROUTES";

const AboutPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        paddingBottom: "60px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 3,
          backgroundColor: "sectionBackground.default",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Our Business Networking Platform
        </Typography>

        <Typography variant="body1" sx={{ color: "text.default" }}>
          At "Eden Drori Business Cards", we provide a powerful platform for
          professionals to connect, network, and grow their business. Whether
          you're an individual looking for opportunities or a business seeking
          to expand your reach, we've got you covered!
        </Typography>

        <Typography variant="h5" mt={3} sx={{ color: "text.default" }}>
          Key Features
        </Typography>

        <Typography variant="body1" sx={{ color: "text.default" }}>
          <strong>Create Your Profile:</strong> Join our community by creating a
          user account. It's free and easy!
        </Typography>

        <Typography variant="body1" sx={{ color: "text.default" }}>
          <strong>Business or Personal:</strong> Define your account as a
          business or a personal account, depending on your needs.
        </Typography>

        <Typography variant="body1" sx={{ color: "text.default" }}>
          <strong>Explore Business Cards:</strong> Browse through a vast
          collection of business cards created by our users. Find potential
          clients, partners, or simply get inspired.
        </Typography>

        <Typography variant="body1" sx={{ color: "text.default" }}>
          <strong>Interact with Cards:</strong> When you log in, you can like
          cards to show your interest. You'll also get access to the contact
          details of businesses.
        </Typography>

        <Typography variant="body1" sx={{ color: "text.default" }}>
          <strong>Create, Edit, Delete Cards:</strong> Business account holders
          can create, edit, and delete their own cards. Showcase your services
          or products effortlessly.
        </Typography>

        <Typography variant="body1" sx={{ color: "text.default" }}>
          <strong>Favorite Cards:</strong> Keep track of the cards you've liked
          in your "Favorite Cards" page.
        </Typography>

        <Typography variant="body1" sx={{ color: "text.default" }}>
          <strong>Manage Your Cards:</strong> Business account holders can view,
          edit, and delete their own cards in the "My Cards" section.
        </Typography>

        <Typography variant="h5" mt={3} sx={{ color: "text.default" }}>
          Get Started Today
        </Typography>

        <Typography variant="body1" sx={{ color: "text.default" }}>
          Join "Eden Drori Business Cards" now and start connecting with
          professionals, exploring business opportunities, and growing your
          network. It's time to make your mark in the business world!
        </Typography>

        <Link
          variant="button"
          href={ROUTES.REGISTER}
          mt={3}
          sx={{ color: "primary" }}
        >
          Create Your New Account
        </Link>
      </Paper>
    </Container>
  );
};

export default AboutPage;
