// Define an array of topics that students will rank
const topics = ['HTML', 'CSS', 'JavaScript'];

// Define an array of ranking options, each with a numeric value and descriptive label
const rankings = [
    { value: 5, label: 'Awesome' },
    { value: 4, label: 'Great' },
    { value: 3, label: 'Good' },
    { value: 2, label: 'Okay' },
    { value: 1, label: 'Poor' },
    { value: 0, label: 'Unranked' }
];

// Asynchronous function to simulate fetching topics from an API
async function getTopics() {
    // Simulate a network delay of 500ms
    await new Promise(resolve => setTimeout(resolve, 500));
    // Return the topics array (in a real scenario, this would be fetched from an API)
    return topics;
}

// Asynchronous function to simulate fetching rankings from an API
async function getRankings() {
    // Simulate a network delay of 500ms
    await new Promise(resolve => setTimeout(resolve, 500));
    // Return the rankings array (in a real scenario, this would be fetched from an API)
    return rankings;
}

// Asynchronous function to create form elements dynamically
async function createFormElements() {
    // Get a reference to the form element in the HTML
    const form = document.getElementById('rankingForm');
    // Display a loading message while fetching data
    form.innerHTML = '<p>Loading...</p>';

    try {
        // Fetch topics and rankings concurrently using Promise.all
        const [topicsData, rankingsData] = await Promise.all([getTopics(), getRankings()]);

        // Clear the loading message
        form.innerHTML = '';

        // Iterate over each topic to create form elements
        topicsData.forEach(topic => {
            // Create a fieldset element for each topic
            const fieldset = document.createElement('fieldset');
            // Create a legend element for the fieldset
            const legend = document.createElement('legend');
            // Set the legend text to the current topic
            legend.textContent = topic;
            // Add the legend to the fieldset
            fieldset.appendChild(legend);

            // Create a select element for ranking options
            const select = document.createElement('select');
            // Set the name attribute of the select element
            select.name = topic.toLowerCase();
            // Set the id attribute of the select element
            select.id = topic.toLowerCase();

            // Iterate over each ranking option to create option elements
            rankingsData.forEach(ranking => {
                // Create an option element
                const option = document.createElement('option');
                // Set the value attribute of the option
                option.value = ranking.value;
                // Set the displayed text of the option
                option.textContent = ranking.label;
                // Add the option to the select element
                select.appendChild(option);
            });

            // Add the select element to the fieldset
            fieldset.appendChild(select);
            // Add the fieldset to the form
            form.appendChild(fieldset);
        });

        // Create a submit button for the form
        const submitButton = document.createElement('button');
        // Set the button type to 'submit'
        submitButton.type = 'submit';
        // Set the button text
        submitButton.textContent = 'Submit Rankings';
        // Add the submit button to the form
        form.appendChild(submitButton);
    } catch (error) {
        // If an error occurs, display an error message
        form.innerHTML = '<p>Error loading form. Please try again later.</p>';
        // Log the error to the console for debugging
        console.error('Error:', error);
    }
}

// Asynchronous function to handle form submission
async function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get a reference to the results div in the HTML
    const results = document.getElementById('results');
    // Display a processing message
    results.innerHTML = '<p>Processing...</p>';

    try {
        // Fetch the latest topics and rankings data
        const topicsData = await getTopics();
        const rankingsData = await getRankings();

        // Clear the processing message and add a header for results
        results.innerHTML = '<h2>Your Rankings:</h2>';

        // Iterate over each topic to display the selected ranking
        topicsData.forEach(topic => {
            // Get the select element for the current topic
            const select = document.getElementById(topic.toLowerCase());
            // Get the selected value
            const value = select.value;
            // Find the corresponding label for the selected value
            const label = rankingsData.find(r => r.value == value).label;
            // Add the ranking result to the results div
            results.innerHTML += `<p>${topic}: ${label} (${value})</p>`;
        });
    } catch (error) {
        // If an error occurs, display an error message
        results.innerHTML = '<p>Error processing results. Please try again later.</p>';
        // Log the error to the console for debugging
        console.error('Error:', error);
    }
}

// Asynchronous function to initialize the app
async function init() {
    // Create the form elements
    await createFormElements();
    // Add an event listener for form submission
    document.getElementById('rankingForm').addEventListener('submit', handleSubmit);
}

// Run the initialization function and catch any errors
init().catch(error => {
    // Log any initialization errors to the console
    console.error('Initialization error:', error);
    // Display an error message if initialization fails
    document.body.innerHTML = '<p>Failed to initialize the app. Please refresh the page or try again later.</p>';
});