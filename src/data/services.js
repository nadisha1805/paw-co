export const services = [
  {
    id: 1,
    name: "Grooming Deluxe",
    shortDescription: "A complete pampering session for your pet.",
    description: "Our Grooming Deluxe package offers the ultimate spa experience. It includes a deep-cleansing bath, blow dry, thorough brushing, nail trimming, ear cleaning, and a customized haircut to keep your pet looking their best.",
    price: 45,
    duration: "60 minutes",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800",
    includes: ["Deep Cleansing Bath", "Blow Dry", "Thorough Brushing", "Nail Trim", "Ear Cleaning", "Custom Haircut"],
    notes: "Please arrive 10 minutes early. Let us know if your pet has any skin sensitivities.",
    reviews: [
      { id: 1, author: "Sarah T.", rating: 5, text: "Max looks and smells amazing! Highly recommend.", date: "2023-10-01" },
      { id: 2, author: "James L.", rating: 4, text: "Great service, took a little longer than expected but very happy.", date: "2023-09-15" }
    ]
  },
  {
    id: 2,
    name: "Bath & Hygiene",
    shortDescription: "Keep your pet fresh and clean.",
    description: "Perfect for maintaining your pet's hygiene between full grooming sessions. We use premium, hypoallergenic shampoos tailored to your pet's skin type.",
    price: 25,
    duration: "30 minutes",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
    includes: ["Hypoallergenic Bath", "Towel Dry", "Quick Brush", "Cologne Spritz"],
    notes: "Suitable for all breeds and sizes.",
    reviews: []
  },
  {
    id: 3,
    name: "Nail Care & Paws",
    shortDescription: "Gentle nail trimming and pad treatment.",
    description: "Overgrown nails can be painful. Our gentle nail care service ensures your pet's paws are healthy, comfortable, and ready for walks.",
    price: 15,
    duration: "15 minutes",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
    includes: ["Nail Trimming", "Nail Filing", "Paw Pad Moisturizer"],
    notes: "We use gentle techniques for anxious pets.",
    reviews: [
      { id: 1, author: "Emily R.", rating: 5, text: "Very gentle with my anxious dog. Thank you!", date: "2023-10-05" }
    ]
  }
];
