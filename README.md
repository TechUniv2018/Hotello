# Hotello

## Problem Statement

Design and develop an application which will allow users to search for hotels, book hotel,
manage bookings. The application should also have an admin only section to manage
coverage(cities/areas), bookings, services and users.

## Goals

- Admin Section - Authentication and Authorisation
- Admin Section - Manage Users
- Admin Section - Manage Cities and Areas within cities
- Admin Section - Manage Services
- Admin Section - Manage Bookings
- Public Section - User Registration Journey & User login
- Public Section - Hotels search journey
- Public Section - Hotels details with services
- Public Section - Hotel booking journey
- Public Section - Payment gateway integration
- Public Section - Booking history/Manage Bookings
- Ensure the code passes linting test
- Ensure 75% coverage for all your code
- Ensure that you have migrations for each database change you make.
- Document the API contracts and keep it updated.

## Stretch Goals

- Public Section - Ratings and reviews for the hotel
- Public Section- Compare hotels
- Admin Section - Search History with visualisation for a daily, weekly, monthly dataset
- Admin Section - Booking History with visualisation for a daily, weekly, monthly
    dataset
- Native App - User registration
- Native App - Hotels Search
- Native App - Hotel booking and booking history
- Recommendations engine

## Use cases

The application has two types of users, admin and public. Following are the use cases with
respect to the type of user/actor.


### Admin

### 1. Login

```
Actors – Admins, our platform.
Description – This use case describes how to login to the application using admin login
details, logout and change password. There is no sign-up option. New admin can only be
added by old admins.
```

Normal Workflow –

1. The admin will click on login for admin from the home page of the application.
2. The admin will have to enter the username and password and then click on the login
    button for authentication.
3. On successful authentication, the admin will be led to the admin home page which
    will have tabs of the features he is authorized to use.
4. The admin will have a logout option of the top right corner of the screen at all times
    after login. On clicking the logout option, the admin will be logged out and redirected
    to the login page.
5. The admin will click on the profile icon to view his/her profile details.
6. The admin will click on the change password option in the profile, to change the login
    password. It will direct to the change password page, where the admin will enter the
    old password, the new password and re-enter the new password for confirmation. If
    the password is secure enough according to the set criteria, then the save new
    password button will be enabled, otherwise a message box will display that the
    password is not secure enough. On clicking the save new password button, will change
    the password and direct to the home page.


Alternate Workflow – If credentials are invalid

1. It will inform the user that credentials are invalid and redirect to the admin login page.
2. If the credentials belong to a public user, a pop up will inform the user that they are
    not authorized for admin login and ask if they want to login as public user.
3. If the user clicks the ‘yes’ button it will direct to the public user login page.
4. If the user clicks on ‘no’, it will redirect to the admin login page.

### 2. Manage users

```
Actors – Admins, our platform
Description – This use case allows the admin to view users, add users, edit user details,
delete users and provide a password reset link to the users. The admin will also be able to
search users and filter them based on their details and roles. New admin logins can be
added by the existing admins.
```

Normal Workflow –

1. After login, the admin can click on the manage users option from the menu/navigation
    bar on the left of the home page.
2. On clicking the manage users option, the admin will be directed to the manage users
    page which will display a list of users with their details. The admin can scroll down 
    the list and can switch between pages by clicking on the previous page and next page
    options to view all the users.
3. The admin will click on the filter icon to filter the list of users being displayed. The
    admin will then select from a drop-down list of options to filter users by. The list of
    users will then display the filtered users.
4. The admin will click on the search bar to search a particular user or a category of users
    by entering any user details.
5. To edit user details the admin will click on the edit icon which is made available for
    each user. The admin will click on the edit icon for the user whose details have to be
    edited. It will direct him to the page where he can edit all the details except the
    username and password. After making the changes, the admin will click on the save
    changes button and will be redirected to the manage users page.
6. To delete a user, the admin will click on the delete icon for the user which has to be
    deleted. On clicking the icon, a pop-up window will appear asking for confirmation
    to delete all the details for that particular user. The admin will click on ‘yes’ to confirm
    deletion and click ‘no’ to cancel deletion.
7. The admin will click on the suspend button to suspend a public user temporarily. The
    admin will be able to suspend another admin only if it is authorized to do it. The
    suspend button will be disabled for the users for which the admin is not authorized to
    suspend. For a user who is suspended, the suspend button will be replaced by a button
    to unsuspend the suspended user.
8. The admin will click on reset password button if the user requests for a password
    change. On clicking the reset password button, an email will be sent to the registered
    email id of the user which will contain a password reset link. The admin cannot
    manually reset the password for a user.
9. The admin can click on the add user icon on the manage users home page to add users.
    It will direct him to the add user page where he will enter the details for the user and
    select a role- admin or public, for the user. After filling the mandatory fields the save
    user option will be enabled. After filling the required fields, the admin will click on
    the save user button to save the details. The admin will be directed to the manage users
    page after saving the details.

### 3. Manage cities and areas within cities

```
Actors – Admins, our platform
Description – This use case allows the admin to manage cities and areas covered by the
application. It allows to add city names and description, add and manage areas within
cities, edit, delete and modify the city and area details. It also allows the admin to search
the filter the cities and areas.
```

Normal Workflow –

1. The user will click the manage cities option from the menu to manage cities and areas.
2. A table will be displayed containing a list of cities, the number of areas and number
    of bookings for each city. The admin can scroll down or switch between pages by
    clicking on the previous or next button, to view all the cities.
3. To add a city the admin can click on the add city icon. The admin will be directed to
    another page which will contain a form where the details of the new city have to be
    entered. After filling all the mandatory fields, the button for save changes will be
    save the details of the city. After saving, the admin will be redirected to the manage
    cities page.
4. To, view the areas within a particular city, the admin will click on the number of areas
    for that city. A list of areas and its details including name, description and location
    coordinates will be displayed.
5. An area can be added to the city by clicking on the add area icon. The admin will be
    directed to a form to be filled with the details of the new area. After filling all the
    mandatory fields, the button for save changes will be enabled. After entering the
    details, the admin will click on the save changes button to save the details of the area.
    After saving, the admin will be redirected to the manage cities page.
6. If a city or an area within a city being added already exists, the admin will be notified
    by a pop-up box and will be directed to the manage cities page.
7. Each area will have an icon for modify and delete. The user can click on the respective
    icons to modify the area details and delete the area.
8. On clicking the modify icon for an area, the admin will be directed to another page
    which will contain a form with the current details of the area to be modified. After
    making the required changes, the admin will click on the save changes button to save
    the modifications made. The admin will be redirected to the manage cities page after
    the modifications.
9. To delete an area, the admin will click on the delete icon for that area in the list of all
    areas for a city. A pop-up window will appear asking for confirmation to delete all the
    details for that particular area. The admin will click on ‘yes’ to confirm deletion and
    click ‘no’ to cancel deletion.
10. The admin will click on the filter icon to filter the list of cities/areas being displayed.
    The admin will then select from a drop-down list of options to filter cities/areas by.
    The list will then display the filtered cities/areas.
11. The admin will click on the search bar to search a particular city/area by entering the
    search text.

### 4. Manage services

```
Actors – Admins, our platform
Description – This use case allows the admin to add and manage services for the public
users in the form of a list of services available in the listed hotels example Wi-Fi, laundry,
breakfast, gym, etc.
```

Normal Workflow –
1. The admin will click on the manage services option from the menu to manage services
    provided by the hotels.
2. A list of hotels will be displayed. For each hotel, there will be a list of services with a
    checkbox next to each service.
3. The services provided by a particular hotel will be checked for that hotel. The admin
    will check/ uncheck the checkboxes in case of modifications in the services provided
    by a particular hotel.
4. The admin will click on the add services icon to add a service to the list of services.
    On adding a new service, it will be unchecked for all hotels by default. The admin can
    then check that service for hotels which provide it.

### 5. Manage bookings

```
Actors – Admins, our platform
Description – This use case allows the admin to view, search, filter and cancel bookings.
The search and filter can be done by the available fields like booking id, city, etc.
```
Normal Workflow –
1. The admin will click the manage bookings option from the menu to manage bookings.
2. It will direct to another page which will display all the bookings and their details in a
    tabular way. The admin can scroll down the table and switch between pages to view
    all the bookings.
3. The admin will click on the filter icon to filter the list of bookings being displayed.
    The admin will then select from a drop-down list of options to filter by. The list will
    then display the filtered bookings.
4. The admin will click on the search bar to search a particular booking or a group of
    bookings by entering the search text.
5. The admin will click on the add booking icon to add a booking if requested by a user.
    The admin will fill in the details and select the hotel on behalf of the user. The admin
    will choose the payment option as pay at check-in or send a payment link to the user
    through mail. An invoice will be generated on booking completion. The admin will
    send it to the user through mail.
6. The admin can cancel a booking by clicking on the cancel icon next to the bookings
    in the table. A pop-up window will appear asking for confirmation to cancel the
    booking. The admin will click on ‘yes’ to confirm cancellation and click ‘no’
    otherwise.

### Public User

### 1. User registration and login

```
Actors – Public user, our platform.
Description – This use case describes how to login to the application using public login
details, sign up, logout and change password.
```
Normal Workflow –
1. The user will click on login from the home page of the application.
2. The user will have to enter the username and password and then click on the login
    button for authentication.
3. On successful authentication, the user will be led to the home page for searching and
    booking hotels.
4. If the user does not have an account, he will click on the sign-up option. It will direct
    to the sign-up page. The user will enter the email id, username and password. If the
    username entered is already taken by another user, the user will be notified and asked
    to enter another username. If the password is not strong enough or email id is not
    valid, the user will be notified and asked to enter again. If the password is strong
    enough, the user will re-enter the password. After entering all the required fields, the
    user will click on the sign-up button. The user will then be directed to the login page.
5. The user will have a logout option of the top right corner of the screen at all times
    after login. On clicking the logout option, the user will be logged out and redirected
    to the login page.
6. The user will click on the change password option in the profile, to change the login
    password. It will direct to the change password page, where the user will enter the old
    password, the new password and re-enter the new password for confirmation. If the
    password is secure enough according to the set criteria, then the save new password
    button will be enabled, otherwise a message box will display that the password is not
    secure enough. On clicking the save new password button, will change the password
    and direct to the home page.


Alternate Workflow –

1. The user can go to the home page and search for hotels without sign-in. After selecting
    the hotel, the user will need to log in to an account to make a booking. On clicking
    book now, the selection details will be saved and user will be directed to the login
    page.
2. After successful login, the user will be able to complete the booking.

### 2. Hotel search

```
Actors – Public user, our platform
Description – This use case describes the hotel search journey of the public user, with or
without login to an account.
```

Normal Workflow –
1. The user will search for hotels on the home page of the application. Alternatively, the
    user will login and will be directed to the hotel search page.
2. The user will enter the city or an area within a city in the search field. Based on the
    text entered, the user will see suggestions of the city names and areas related to the
    search as a drop-down list. The user will select one option from the list.
3. The user will enter the check-in and check-out date by clicking on the calendar icon
    next to the check-in and check-out fields, and select the date from the calendar. The
    calendar for check-in will only have the current and later dates enabled for selection.
    After selecting the check-in date, the check-out calendar will have the dates after the
    check-in date enabled for selection.
4. The user will enter the number of adults, number of children, number of rooms and
    number of people in each room. The user will click on search button after entering the
    details.
5. The user will be directed to another page with the hotel search results. A list of the
    available hotels in the selected place, will be displayed. The user can scroll down the
    list or switch between pages to view all the hotels.
6. The user will see the selected place, check-in date, check-out date, number of people
    and number of rooms at all times in the hotel booking journey. The user can edit these
    details if needed and click on search. The search results will change accordingly.
7. The user can filter the search results by area, stars and price. The hotel search page
    will have a filters option on the left. To filter by area, the user can check the
    checkboxes next to the areas to be included or uncheck the ones not to be included.
    To filter by stars, the user will check the checkbox next to the stars to be included. To
    filter by price, the user will check the checkboxes for the price range of the hotels to
    be included in the search. The hotels list on the page will change according to the
    selected filters. The user will click on reset to reset the filters to default.
8. Each hotel in the list will have the hotel name, address, image of the hotel, price per
    room per night, rating and options to view and book now.
9. The user will click on the book now option to book the hotel. It will direct to another
    page for booking the hotel.
10. The user will click on the view button to view complete details of the hotel. The user
    will be directed to another page with the hotel details and services.

### 3. Hotel details with services

```
Actors – Public user, our platform
Description – This use case describes how the user can view the details of the selected
hotel and what details will be available to the user for any particular hotel.
```
Normal Workflow –
1. On clicking the view button for a hotel from the list on the search hotels page, the user
    will be directed to another page with the details of the selected hotel.
2. The user will see the hotel’s name, stars, address, price per room per night, photos and
    a list of icons for the services provided by the hotel.
3. The user will also see the check-in and check-out time of the hotel and other important
    information if any.
4. The user can view the hotel policies below the important information.
5. The user can also view the check-in date, check-out date, number of rooms and
    number of people selected earlier. The user can modify these if needed.
6. The user can scroll down the page to view all the details.
7. The user will select the type of room. The price displayed will change according to
    type of room selected.
8. The user can click on the book now button. It will direct to the booking page for the
    selected hotel, dates, number of rooms and the type of room.

### 4. Hotel booking

```
Actors – Public user, our platform
Description – This use case describes the users journey of booking the selected hotel.
```
Normal Workflow –
1. The user will see a summary of the details entered till now. The user cannot change
    these details on this page. To make changes to these details, the user can go back to
    the previous page.
2. The user will enter the first name, last name and age for all the guests.
3. The user will enter a contact number of any of the guests.
4. The user will click on the pay button to confirm the booking. It will direct to the make
    payment page.

### 5. Booking payment

```
Actors – Public user, our platform
Description – This use case describes how to the user can make the payment to confirm
the booking. After the booking confirmation, the user will receive an invoice for the
booking.
```

Normal Workflow –
1. The user will be directed to the payments page after confirming the booking. The user
    will see the booking details and final amount of the booking.
2. The user will select the payment option by clicking on the radio button next to the
    option. The user can choose to pay by credit card, debit card, net banking or other.
    The other option will depend on the hotel being booked and may include payment at
    check-in.
3. After selecting the payment option, the user will fill in the details of the card/net
    banking. The user will click on confirm and pay button. If the payment is successful,
    the user will be directed to the booking confirmation page. If the payment fails, the
    user will see a payment failure error message and will be redirected to the payment
    page.
4. The user will be directed to the booking confirmation page after successful payment.
5. The user will see the booking invoice with the unique booking id and all the booking
    details like time of booking, time of stay, number of people, details of guests, type of
    room, mode of payment and the amount of the booking. The invoice will also be sent
    to the user on the registered email id.
6. The user will click on the book another button to go to the home page.

### 6. Manage bookings

```
Actors – Public user, our platform
Description – This use case describes
```
Normal Workflow –
1. The user will click on the profile icon from any page after login to manage the profile.
    The user will click on manage bookings from the manage profile list to view and
    manage bookings.
2. The user will see a list of all the bookings sorted as past, current, upcoming and
    cancelled.
3. The user can only view the details or request invoice on mail for past and current
    bookings.
4. The user will click on cancelled booking to view the details. The user can only view
    the details for cancelled bookings.
5. The user will click on the upcoming bookings to manage them. The user will click on
    cancel booking to cancel the booking.
6. The user will click on modify booking to modify any booking detail like check-in
    date, check-out date, number of people or the type of room. The modification request
    will be forwarded and it will be approved in case the modification requested is
    possible otherwise it will be rejected and user will be notified of the same.
7. In case the modification is approved, the user will be directed to another page with
    the modified invoice. The modified invoice will also be mailed to the registered email
    id.


## Use case diagrams

### 1. Login System
![admin login](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Use%20case%20diagrams/login.png)


### 2. Manage Users (Add/Modify/Remove User)
![manage users](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Use%20case%20diagrams/add_modify_remove_user_usecase_diagram.png)

### 3. Manage Cities (Add/Modify/Remove Cities)
![manage cities/areas](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Use%20case%20diagrams/add%2Cmodify%2Cremove%20cities%2Careas%20(1).png)


### 4. Manage Services (Add/Modify/Remove Services)
![manage services](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Use%20case%20diagrams/add%2Cmodify%2Cremove%20services%20(1).png)


### 5. Manage Bookings (Modify/Remove Bookings)
![manage bookings](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Use%20case%20diagrams/modify%2Cremove%20booking%20(3).png)


### 6. Public user login:
![public login](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Use%20case%20diagrams/login%20(3).png)


### 7. User search journey
![user search](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Use%20case%20diagrams/proper_search_journey.png)


### 8. View hotel
![view hotel](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Use%20case%20diagrams/proper_view_hotel.png)


### 9. Booking Journey
![booking journey](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Use%20case%20diagrams/BookingJourney%20(2).png)


### 10. Booking management
![booking management](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Use%20case%20diagrams/bookingManagement%20(2).png)


### 11. Payment Gateway
![payment gateway](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Use%20case%20diagrams/PaymentGateway%20(2).png)


## Wireframes for Admin

### 1. Login

#### a. Web
![admin login](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Web%20wireframes/Screen%20Shot%202018-01-26%20at%202.47.50%20PM.png)


#### b. Mobile
![admin login](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Mobile%20wireframes/admin_login.png)

### 2. Manage Users

#### a. Web
![manage users](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Web%20wireframes/Screen%20Shot%202018-01-26%20at%203.42.03%20PM.png)


#### b. Mobile
![manage users](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Mobile%20wireframes/admin_manageUsers.png)


### 3. Manage Cities

#### a. Web
![manage cities](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Web%20wireframes/Screen%20Shot%202018-01-27%20at%201.49.40%20PM.png)

#### b. Mobile
![manage cities](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Mobile%20wireframes/admin_manageCities.png)



### 4. Manage Bookings

#### a. Web
![manage bookings](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Web%20wireframes/Screen%20Shot%202018-01-29%20at%203.47.18%20PM.png)

#### b. Mobile
![manage bookings](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Mobile%20wireframes/admin_manageBookings.png)



## Wireframes for public users

### 1. Log in

#### a. Web
![public login](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Web%20wireframes/Login.png)

#### b. Mobile
![public login](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Mobile%20wireframes/Login.png)


### 2. Sign up
#### a. Web
![public signup](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Web%20wireframes/Screen%20Shot%202018-01-30%20at%209.24.20%20PM.png)

#### b. Mobile
![public signup](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Mobile%20wireframes/sign_up.png)



### 3. Landing page
#### a. Web
![landing](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Web%20wireframes/Landing_page.png)
#### b. Mobile
![landing](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Mobile%20wireframes/Landing_page.png)


### 4. Search
#### a. Web
![search](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Web%20wireframes/Search_results.png)

#### b. Mobile
![search](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Mobile%20wireframes/Search_results.png)

### 5. Details
#### a. Web
![details](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Web%20wireframes/Hotel_details.png)

#### b. Mobile
![details](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Mobile%20wireframes/Hotel_details.png)

### 6. Payment


#### a. Web
![payment](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Web%20wireframes/Payment.png)

#### b. Mobile
![payment](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Mobile%20wireframes/Payment.png)

### 7. Payment confirmation
#### a. Web
![payment conf](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Web%20wireframes/Payment_confirmation.png)

#### b. Mobile
![payment conf](https://github.com/TechUniv2018/Hotello/blob/documents/Diagrams/Mobile%20wireframes/Payment_confirmation.png)
