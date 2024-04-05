# Book Use Now

## Project Overview
Book Use Now is an event booking website designed to make event planning and booking hassle-free. Whether it's concerts, conferences, or workshops, users can easily find and book events using this platform.

## Features
- Search and browse upcoming events
- Book tickets for events
- View event details including date, location, and description
- Get recommendations based on user preferences
- Seamless checkout process

## Technologies Used
- Frontend: HTML, CSS, JavaScript, React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- API Integration: Integration with external APIs for event data

## Getting Started
1. **Clone the repository**:

    ```bash
    git clone https://github.com/07Akashh/BookUsNow_App.git
    ```

3. **Install Dependencies**:

   ```bash
   cd book-use-now
   npm install
   ```

3. **Set Up Environment Variables**:
- Create a `.env` file in the root directory.
- Define environment variables such as database connection string, API keys, etc.

4. **Run the Application**:

   ```bash
   npm start
   ```

## Contributing
Contributions are welcome! If you find any issues or want to suggest enhancements, please create a GitHub issue or submit a pull request.

## License
This project is licensed under the MIT License.

## Support
If you find Book Use Now helpful or have any questions, feel free to reach out to us.

## Acknowledgements
We would like to thank all the contributors who helped make Book Use Now possible.

---

# Frontend Developer Internship Assignment

## Objective
The objective of this assignment is to build a responsive website that displays upcoming and recommended events. The website should fetch event data from provided APIs and support both desktop and mobile screen sizes.

### Demo Videos for Reference
- [Desktop Video](#) *(insert link to desktop video)*
- [Mobile Video](#) *(insert link to mobile video)*

## Fetching Events
The website should display two types of events: recommended shows and upcoming events.

### Recommended Shows
There are 8 recommended shows displayed in a horizontal infinite scroll. Fetch the recommended events using the following API:

https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco

The API response includes an `img_url` which should be used as the thumbnail image for the event.

### Upcoming Events
Display several upcoming events in a vertical scroll. Fetch the upcoming events using this API:

https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=1&type=upcoming

Note: The upcoming events API has multiple pages. Fetch a new page of events only when the user has scrolled to the end of the page. Show a loading spinner while fetching the next page from the backend API.

### Example Event Schema

```json
{
    "eventName": "Winter Wonderland Fair",
    "cityName": "West Douglas",
    "date": "2024-03-24T00:00:00.000Z",
    "weather": "Snowy 26C",
    "distanceKm": "4264.1226847222415",
    "img_url": "https://drive.google.com/file/d/1lS1XAo47YvNSoFp1NE5rmhTSQ8qNBWEh/view"
}



