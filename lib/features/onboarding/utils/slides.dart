class Slide {
  final String assetName;
  final String description;

  Slide({required this.assetName, required this.description});
}

final List<Slide> onboardingSlides = [
  Slide(assetName: 'assets/onboarding/1.png', description: 'Connecting with people'),
  Slide(assetName: 'assets/onboarding/2.png', description: 'Best reservation anytime you want'),
  Slide(assetName: 'assets/onboarding/3.png', description: '100+ Branch locations'),
];
