import 'package:auto_route/auto_route.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:kosoku/core/utils/style/colors.dart';
import 'package:kosoku/features/navigation/presentation/app_router.dart';
import 'package:kosoku/features/onboarding/utils/slides.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return OnboardingState();
  }
}

const int SCREEN_PADDING = 16;

class OnboardingState extends State<OnboardingScreen> {
  int currentIndex = 0;
  CarouselController buttonCarouselController = CarouselController();

  @override
  void initState() {
    super.initState();
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.light);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Stack(
          children: [
            CarouselSlider(
                items: onboardingSlides.map((e) {
                  return Builder(
                      builder: (context) {
                        var screenSize = MediaQuery.of(context).size;

                        return Container(
                          width: screenSize.width,
                          margin: EdgeInsets.zero,
                          child: Image(
                            image: AssetImage(e.assetName),
                            fit: BoxFit.cover,
                          ),
                        );
                      }
                  );
                }).toList(),
                options: CarouselOptions(
                  height: MediaQuery.of(context).size.height,
                  viewportFraction: 1,
                  initialPage: currentIndex,
                  enableInfiniteScroll: false,
                  scrollPhysics: const ClampingScrollPhysics(),
                  onPageChanged: (index, reason) {
                    setState(() {
                      currentIndex = index;
                    });
                  }
                ),
                carouselController: buttonCarouselController,
            ),
            Positioned(
                bottom: 50,
                left: 0,
                child: Container(
                  height: 200,
                  margin: const EdgeInsets.only(left: SCREEN_PADDING * 2),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        "Kosoku",
                        style: TextStyle(
                          fontFamily: 'Ascent',
                          fontWeight: FontWeight.bold,
                          color: AppColors.white,
                          fontSize: 36
                        ),
                      ),
                      Container(
                        margin: const EdgeInsets.only(top: 20, bottom: 50),
                        child: Text(
                          onboardingSlides[currentIndex].description,
                          style: const TextStyle(
                            fontWeight: FontWeight.w500,
                            color: AppColors.red,
                            fontSize: 18,
                          ),
                        ),
                      ),
                      Expanded(
                          child: Container(
                            constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width - SCREEN_PADDING * 4),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                ListView.builder(
                                    shrinkWrap: true,
                                    scrollDirection: Axis.horizontal,
                                    itemCount: onboardingSlides.length,
                                    itemBuilder: (context, index) {
                                      return Container(
                                        margin: const EdgeInsets.only(right: 20),
                                        alignment: Alignment.center,
                                        child: Text(
                                            (index + 1).toString(),
                                            style: TextStyle(
                                              fontWeight: FontWeight.w500,
                                              color: index == currentIndex ? AppColors.red : AppColors.white,
                                              fontSize: 18,
                                            )
                                        ),
                                      );
                                    }
                                ),
                                TextButton(
                                    onPressed: () {
                                      if(currentIndex == onboardingSlides.length - 1) {
                                        AutoRouter.of(context).replace(const AuthRoute());
                                      } else {
                                        buttonCarouselController.nextPage();
                                      }
                                    },
                                    child: Text(
                                        currentIndex == onboardingSlides.length - 1 ? "Login" : "Next",
                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                          color: AppColors.red,
                                          fontSize: 18,
                                        )
                                    )
                                )
                              ],
                            ),
                          )
                      )
                    ],
                  ),
                )
            )
          ],
        )
    );
  }
}
