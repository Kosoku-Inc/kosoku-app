// **************************************************************************
// AutoRouteGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouteGenerator
// **************************************************************************
//
// ignore_for_file: type=lint

part of 'app_router.dart';

class _$AppRouter extends RootStackRouter {
  _$AppRouter([GlobalKey<NavigatorState>? navigatorKey]) : super(navigatorKey);

  @override
  final Map<String, PageFactory> pagesMap = {
    SplashRoute.name: (routeData) {
      return MaterialPageX<dynamic>(
          routeData: routeData, child: const SplashScreen());
    },
    OnboardingRoute.name: (routeData) {
      return CustomPage<dynamic>(
          routeData: routeData,
          child: const OnboardingScreen(),
          transitionsBuilder: TransitionsBuilders.fadeIn,
          opaque: true,
          barrierDismissible: false);
    },
    AuthRoute.name: (routeData) {
      return CustomPage<dynamic>(
          routeData: routeData,
          child: const EmptyRouterScreen(),
          transitionsBuilder: TransitionsBuilders.fadeIn,
          opaque: true,
          barrierDismissible: false);
    },
    MainRoute.name: (routeData) {
      return CustomPage<dynamic>(
          routeData: routeData,
          child: const EmptyRouterScreen(),
          transitionsBuilder: TransitionsBuilders.slideBottom,
          opaque: true,
          barrierDismissible: false);
    },
    LoginRoute.name: (routeData) {
      return MaterialPageX<dynamic>(
          routeData: routeData, child: const LoginScreen());
    },
    RegisterRoute.name: (routeData) {
      return MaterialPageX<dynamic>(
          routeData: routeData, child: const RegisterScreen());
    },
    HomeRoute.name: (routeData) {
      return MaterialPageX<dynamic>(
          routeData: routeData, child: const HomeScreen());
    },
    ProfileRoute.name: (routeData) {
      return MaterialPageX<dynamic>(
          routeData: routeData, child: const ProfileScreen());
    },
    PaymentMethodsRoute.name: (routeData) {
      return MaterialPageX<dynamic>(
          routeData: routeData, child: const PaymentMethodsScreen());
    },
    OrderHistoryRoute.name: (routeData) {
      return MaterialPageX<dynamic>(
          routeData: routeData, child: const OrderHistoryScreen());
    },
    SettingsRoute.name: (routeData) {
      return MaterialPageX<dynamic>(
          routeData: routeData, child: const SettingsScreen());
    }
  };

  @override
  List<RouteConfig> get routes => [
        RouteConfig(SplashRoute.name, path: '/'),
        RouteConfig(OnboardingRoute.name, path: '/onboarding-screen'),
        RouteConfig(AuthRoute.name, path: '/empty-router-screen', children: [
          RouteConfig(LoginRoute.name, path: '', parent: AuthRoute.name),
          RouteConfig(RegisterRoute.name,
              path: 'register-screen', parent: AuthRoute.name)
        ]),
        RouteConfig(MainRoute.name, path: '/empty-router-screen', children: [
          RouteConfig(HomeRoute.name, path: '', parent: MainRoute.name),
          RouteConfig(ProfileRoute.name,
              path: 'profile-screen', parent: MainRoute.name),
          RouteConfig(PaymentMethodsRoute.name,
              path: 'payment-methods-screen', parent: MainRoute.name),
          RouteConfig(OrderHistoryRoute.name,
              path: 'order-history-screen', parent: MainRoute.name),
          RouteConfig(SettingsRoute.name,
              path: 'settings-screen', parent: MainRoute.name)
        ])
      ];
}

/// generated route for
/// [SplashScreen]
class SplashRoute extends PageRouteInfo<void> {
  const SplashRoute() : super(SplashRoute.name, path: '/');

  static const String name = 'SplashRoute';
}

/// generated route for
/// [OnboardingScreen]
class OnboardingRoute extends PageRouteInfo<void> {
  const OnboardingRoute()
      : super(OnboardingRoute.name, path: '/onboarding-screen');

  static const String name = 'OnboardingRoute';
}

/// generated route for
/// [EmptyRouterScreen]
class AuthRoute extends PageRouteInfo<void> {
  const AuthRoute({List<PageRouteInfo>? children})
      : super(AuthRoute.name,
            path: '/empty-router-screen', initialChildren: children);

  static const String name = 'AuthRoute';
}

/// generated route for
/// [EmptyRouterScreen]
class MainRoute extends PageRouteInfo<void> {
  const MainRoute({List<PageRouteInfo>? children})
      : super(MainRoute.name,
            path: '/empty-router-screen', initialChildren: children);

  static const String name = 'MainRoute';
}

/// generated route for
/// [LoginScreen]
class LoginRoute extends PageRouteInfo<void> {
  const LoginRoute() : super(LoginRoute.name, path: '');

  static const String name = 'LoginRoute';
}

/// generated route for
/// [RegisterScreen]
class RegisterRoute extends PageRouteInfo<void> {
  const RegisterRoute() : super(RegisterRoute.name, path: 'register-screen');

  static const String name = 'RegisterRoute';
}

/// generated route for
/// [HomeScreen]
class HomeRoute extends PageRouteInfo<void> {
  const HomeRoute() : super(HomeRoute.name, path: '');

  static const String name = 'HomeRoute';
}

/// generated route for
/// [ProfileScreen]
class ProfileRoute extends PageRouteInfo<void> {
  const ProfileRoute() : super(ProfileRoute.name, path: 'profile-screen');

  static const String name = 'ProfileRoute';
}

/// generated route for
/// [PaymentMethodsScreen]
class PaymentMethodsRoute extends PageRouteInfo<void> {
  const PaymentMethodsRoute()
      : super(PaymentMethodsRoute.name, path: 'payment-methods-screen');

  static const String name = 'PaymentMethodsRoute';
}

/// generated route for
/// [OrderHistoryScreen]
class OrderHistoryRoute extends PageRouteInfo<void> {
  const OrderHistoryRoute()
      : super(OrderHistoryRoute.name, path: 'order-history-screen');

  static const String name = 'OrderHistoryRoute';
}

/// generated route for
/// [SettingsScreen]
class SettingsRoute extends PageRouteInfo<void> {
  const SettingsRoute() : super(SettingsRoute.name, path: 'settings-screen');

  static const String name = 'SettingsRoute';
}
