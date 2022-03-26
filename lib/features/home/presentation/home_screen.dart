import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';

import '../../../core/utils/navigation/route_destination.dart';
import '../../navigation/presentation/app_router.dart';

final destinations = [
  const RouteDestination(
    route: ProfileRoute(),
    icon: Icons.source,
    label: 'Profile',
  ),
  const RouteDestination(
    route: PaymentMethodsRoute(),
    icon: Icons.person,
    label: 'Payment Methods',
  ),
  const RouteDestination(
    route: OrderHistoryRoute(),
    icon: Icons.person,
    label: 'Order History',
  ),
  const RouteDestination(
    route: SettingsRoute(),
    icon: Icons.settings,
    label: 'Settings',
  ),
  const RouteDestination(
    route: AuthRoute(),
    icon: Icons.settings,
    label: 'Logout'
  )
];

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: const [
          Center(
            child: Text("Home"),
          ),
        ],
      ),
      drawer: Drawer(
        child: ListView.builder(
          itemCount: destinations.length,
          itemBuilder: (context, index) {
            final destination = destinations[index];
            return ListTile(
              selected: AutoRouter.of(context).isRouteActive(destination.route.routeName),
              leading: Icon(destination.icon),
              title: Text(destination.label),
              onTap: () {
                // navigating to tapped destination
                if(destination.label == 'Logout') {
                  context.router.replace(destination.route);
                } else {
                  context.router.push(destination.route);
                }
              },
            );
          },
        ),
      ),
    );
  }
}
