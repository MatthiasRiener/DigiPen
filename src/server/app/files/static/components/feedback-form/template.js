
export const template =
    `

    <div class="outerBox">
        <h1>Awww.. Tell us what happened</h1>
        <form action="">
            <label for="title">Title *</label>
            <input type="text" id="title" required autocomplete="off" name="title" placeholder="Title of Review...">

            <label for="email">Email *</label>
            <input type="email" id="email" required autocomplete="off" name="email" placeholder="Enter email...">

            <label for="category">Category *</label>
            <select id="category" required name="category">
                <option disabled selected hidden value>Select category ...</option>
                <option value="Loadingissue">Loadingissue</option>
                <option value="Display error">Display error</option>
            </select>

            <label for="description">Description *</label>
            <textarea id="description" required autocomplete="off" rows="5" cols="50" name="description"
                placeholder="Describe the problem..."></textarea>

            <p>By submitting this form you agree to our terms and conditions and our Privacy Policy which explains how
                we may collect, use and disclose your personalinformation including to third parties.</p>
            <p>* Required</p>
            <input type="submit" value="Submit">
        </form>
    </div>
    `;
