"use client";
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Avatar,
  Paper,
  Divider,
} from "@mui/material";
import NatureIcon from "@mui/icons-material/Nature";
import PetsIcon from "@mui/icons-material/Pets";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SecurityIcon from "@mui/icons-material/Security";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HotelIcon from "@mui/icons-material/Hotel";
import PhoneIcon from "@mui/icons-material/Phone";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Định nghĩa kiểu dữ liệu với TypeScript
interface SectionTitleProps {
  subtitle: string;
  title: string;
  color?: string;
}

interface StatsCardProps {
  count: string;
  label: string;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface AnimalCardProps {
  image: string;
  name: string;
}

interface MembershipCardProps {
  number: string;
  tier: string;
  price: string;
  discount: string;
  adults: string;
  exhibition: string;
  popular: boolean;
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  profession: string;
}

interface VisitingHourItemProps {
  day: string;
  hours: string;
}

// Components
const SectionTitle: React.FC<SectionTitleProps> = ({
  subtitle,
  title,
  color = "primary",
}) => (
  <Box sx={{ textAlign: "center", mb: 5 }}>
    <Typography variant="h6" color={color} sx={{ fontWeight: "bold" }}>
      {subtitle}
    </Typography>
    <Typography
      variant="h3"
      component="h2"
      sx={{ fontWeight: "bold", position: "relative", display: "inline-block" }}
    >
      <Typography
        component="span"
        variant="h3"
        color="primary.main"
        sx={{ fontWeight: "bold", mr: 1 }}
      >
        Zoofari
      </Typography>
      {title}
    </Typography>
  </Box>
);

const StatsCard: React.FC<StatsCardProps> = ({ count, label }) => (
  <Box sx={{ textAlign: "center", p: 2 }}>
    <Typography variant="h3" color="white" sx={{ fontWeight: "bold", mb: 1 }}>
      {count}
    </Typography>
    <Typography variant="h6" color="white" sx={{ fontWeight: "medium" }}>
      {label}
    </Typography>
  </Box>
);

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
}) => (
  <Card
    sx={{
      height: "100%",
      borderRadius: 2,
      boxShadow: 3,
      transition: "all 0.3s ease-in-out",
      "&:hover": { transform: "translateY(-10px)", boxShadow: 6 },
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          borderRadius: "50%",
          width: 60,
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const AnimalCard: React.FC<AnimalCardProps> = ({ image, name }) => (
  <Card
    sx={{
      maxWidth: 345,
      borderRadius: 2,
      overflow: "hidden",
      boxShadow: 3,
      transition: "all 0.3s ease-in-out",
      "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
    }}
  >
    <CardActionArea>
      <CardMedia component="img" height="280" image={image} alt={name} />
      <CardContent sx={{ backgroundColor: "primary.main", color: "white" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

const MembershipCard: React.FC<MembershipCardProps> = ({
  number,
  tier,
  price,
  discount,
  adults,
  exhibition,
  popular,
}) => (
  <Card
    sx={{
      height: "100%",
      borderRadius: 2,
      boxShadow: 3,
      border: popular ? "3px solid #FF9800" : "none",
      position: "relative",
      transition: "all 0.3s ease-in-out",
      "&:hover": { transform: "translateY(-10px)", boxShadow: 6 },
    }}
  >
    {popular && (
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 0,
          backgroundColor: "#FF9800",
          color: "white",
          px: 2,
          py: 0.5,
          fontWeight: "bold",
        }}
      >
        Popular
      </Box>
    )}
    <CardContent sx={{ textAlign: "center", p: 4 }}>
      <Typography
        variant="h5"
        color="primary"
        sx={{ fontWeight: "bold", mb: 1 }}
      >
        {number}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        {tier}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        {price}
      </Typography>
      <Box sx={{ mb: 2, py: 1, borderBottom: "1px solid #eee" }}>
        {discount} discount
      </Box>
      <Box sx={{ mb: 2, py: 1, borderBottom: "1px solid #eee" }}>{adults}</Box>
      <Box sx={{ mb: 2, py: 1 }}>{exhibition}</Box>
      <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
        Get Started
      </Button>
    </CardContent>
  </Card>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  profession,
}) => (
  <Card
    sx={{
      height: "100%",
      borderRadius: 2,
      boxShadow: 3,
      transition: "all 0.3s ease-in-out",
      "&:hover": { transform: "translateY(-10px)", boxShadow: 6 },
      p: 3,
    }}
  >
    <CardContent>
      <Typography variant="body1" sx={{ mb: 3, fontStyle: "italic" }}>
        "{quote}"
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{ mr: 2 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profession}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const VisitingHourItem: React.FC<VisitingHourItemProps> = ({ day, hours }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid #eee",
      py: 2,
      transition: "all 0.3s ease-in-out",
      "&:hover": { backgroundColor: "#f5f5f5" },
    }}
  >
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
      {day}
    </Typography>
    <Typography
      variant="body1"
      color={hours === "Closed" ? "error" : "text.primary"}
    >
      {hours}
    </Typography>
  </Box>
);

// Dữ liệu mẫu
const services: ServiceCardProps[] = [
  {
    icon: <CameraAltIcon fontSize="large" />,
    title: "Animal Photos",
    description: "Capture memorable moments with our animal residents.",
  },
  {
    icon: <SecurityIcon fontSize="large" />,
    title: "Guide Services",
    description: "Professional guides to enhance your zoo experience.",
  },
  {
    icon: <ShoppingCartIcon fontSize="large" />,
    title: "Zoo Shopping",
    description: "Unique animal-themed merchandise at our souvenir shops.",
  },
  {
    icon: <HotelIcon fontSize="large" />,
    title: "Rest House",
    description: "Comfortable areas to relax during your visit.",
  },
];

const animals: AnimalCardProps[] = [
  { image: "https://via.placeholder.com/345x280", name: "Elephant" },
  { image: "https://via.placeholder.com/345x280", name: "Lion" },
  { image: "https://via.placeholder.com/345x280", name: "Giraffe" },
];

const visitingHours: VisitingHourItemProps[] = [
  { day: "Monday", hours: "9:00AM - 6:00PM" },
  { day: "Tuesday", hours: "9:00AM - 6:00PM" },
  { day: "Wednesday", hours: "9:00AM - 6:00PM" },
  { day: "Thursday", hours: "9:00AM - 6:00PM" },
  { day: "Friday", hours: "9:00AM - 6:00PM" },
  { day: "Saturday", hours: "9:00AM - 6:00PM" },
  { day: "Sunday", hours: "Closed" },
];

const memberships: MembershipCardProps[] = [
  {
    number: "01",
    tier: "Standard",
    price: "$99.00",
    discount: "10%",
    adults: "2 adults and 2 children",
    exhibition: "Free animal exhibition",
    popular: false,
  },
  {
    number: "02",
    tier: "Premium",
    price: "$199.00",
    discount: "20%",
    adults: "4 adults and 4 children",
    exhibition: "Free animal exhibition + VIP tour",
    popular: true,
  },
  {
    number: "03",
    tier: "Family",
    price: "$149.00",
    discount: "15%",
    adults: "3 adults and 3 children",
    exhibition: "Free animal exhibition",
    popular: false,
  },
];

const testimonials: TestimonialCardProps[] = [
  {
    quote:
      "An unforgettable experience for the whole family. The exhibits were amazing!",
    name: "Michael Johnson",
    profession: "Teacher",
  },
  {
    quote: "The staff was incredibly helpful and the animals were stunning.",
    name: "Sarah Lee",
    profession: "Photographer",
  },
];

// Main Component với Slider của bạn
const HomePage: React.FC = () => {
  const NextArrow = (props: any) => (
    <Button
      variant="outlined"
      onClick={props.onClick}
      sx={{
        position: "absolute",
        right: 20,
        top: "50%",
        zIndex: 2,
        minWidth: 30,
        width: 35,
        transform: "translateY(-50%)",
        backgroundColor: "rgba(255,255,255,0.5)",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.8)",
        },
      }}
    >
      <ChevronRightIcon />
    </Button>
  );

  const PrevArrow = (props: any) => (
    <Button
      variant="outlined"
      onClick={props.onClick}
      sx={{
        position: "absolute",
        left: 20,
        top: "50%",
        zIndex: 2,
        minWidth: 30,
        width: 35,
        transform: "translateY(-50%)",
        backgroundColor: "rgba(255,255,255,0.5)",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.8)",
        },
      }}
    >
      <ChevronLeftIcon />
    </Button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      {/* Slider giữ nguyên từ code của bạn */}
      <Box
        sx={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          overflow: "hidden",
          "& .slick-slide": {
            position: "relative",
            height: "600px",
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          },
        }}
      >
        <Slider {...settings}>
          <div>
            <img src="https://via.placeholder.com/1920x600" alt="Slide 1" />
          </div>
          <div>
            <img src="https://via.placeholder.com/1920x600" alt="Slide 2" />
          </div>
          <div>
            <img src="https://via.placeholder.com/1920x600" alt="Slide 3" />
          </div>
        </Slider>
      </Box>

      <Container>
        {/* Welcome Section */}
        <Box sx={{ py: 8 }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <SectionTitle
                subtitle="Welcome To Zoofari"
                title="Why You Should Visit!"
              />
              <Typography sx={{ mb: 3 }}>
                Experience a world of wildlife and adventure at Zoofari. Our
                park offers a natural habitat for animals, educational
                experiences, and memorable encounters for visitors of all ages.
              </Typography>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <NatureIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Natural Environment
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <PetsIcon color="primary" sx={{ mr: 2, fontSize: 40 }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      World Best Animals
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" size="large">
                Read More
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src="https://via.placeholder.com/500x400"
                alt="Welcome"
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Stats Section */}
        <Box sx={{ backgroundColor: "primary.main", py: 5 }}>
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={6} md={3}>
                <StatsCard count="500+" label="Total Animals" />
              </Grid>
              <Grid item xs={6} md={3}>
                <StatsCard count="2500+" label="Daily Visitors" />
              </Grid>
              <Grid item xs={6} md={3}>
                <StatsCard count="1000+" label="Total Members" />
              </Grid>
              <Grid item xs={6} md={3}>
                <StatsCard count="150+" label="Saved Wildlife" />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Services Section */}
        <Box sx={{ py: 8 }}>
          <Container>
            <SectionTitle
              subtitle="Our Services"
              title="Special Services For Visitors"
            />
            <Box
              sx={{
                backgroundColor: "primary.main",
                p: 3,
                borderRadius: 2,
                color: "white",
                textAlign: "center",
                mb: 5,
                transition: "all 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Call for more info
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PhoneIcon sx={{ mr: 1 }} /> +012 345 6789
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {services.map((service, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Animals Section */}
        <Box sx={{ py: 8, backgroundColor: "#f8f9fa" }}>
          <Container>
            <SectionTitle
              subtitle="Our Animals"
              title="Let`s See Our Awesome Animals"
            />
            <Grid container spacing={4} sx={{ mb: 4 }}>
              {animals.map((animal, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <AnimalCard image={animal.image} name={animal.name} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ textAlign: "center" }}>
              <Button variant="contained" color="primary" size="large">
                Explore More Animals
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Visiting Hours & Contact Info */}
        <Box sx={{ py: 8 }}>
          <Container>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                  Visiting Hours
                </Typography>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                  {visitingHours.map((item, index) => (
                    <VisitingHourItem
                      key={index}
                      day={item.day}
                      hours={item.hours}
                    />
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                  Contact Info
                </Typography>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Office
                    </Typography>
                    <Typography>123 Street, New York, USA</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Zoo
                    </Typography>
                    <Typography>123 Street, New York, USA</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      Support
                    </Typography>
                    <Typography>+012 345 6789</Typography>
                    <Typography>support@example.com</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Membership Section */}
        <Box sx={{ py: 8, backgroundColor: "#f8f9fa" }}>
          <Container>
            <SectionTitle
              subtitle="Membership"
              title="Join Our Zoofari Family"
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}
            >
              Special Pricing Plans
            </Typography>
            <Grid container spacing={4}>
              {memberships.map((membership, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <MembershipCard
                    number={membership.number}
                    tier={membership.tier}
                    price={membership.price}
                    discount={membership.discount}
                    adults={membership.adults}
                    exhibition={membership.exhibition}
                    popular={membership.popular}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: 8 }}>
          <Container>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}
            >
              What Our Visitors Say!
            </Typography>
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <TestimonialCard
                    quote={testimonial.quote}
                    name={testimonial.name}
                    profession={testimonial.profession}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
