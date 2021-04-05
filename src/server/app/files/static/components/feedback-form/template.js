
export const template =
    `
    <div class="blockclicks" >   
        <div class="outerBox">
            <h1>Awww.. Tell us what happened</h1>
            <form id="feedbackForm">
                <label for="title">Title *</label>
                <input type="text" id="title" autocomplete="off" name="title" placeholder="Title of Review...">
                <span id="titleCorr" class="corr">Title must not be empty</span>

               

                <label for="category">Category *</label>
                <select id="category" name="category">
                    <option disabled selected hidden value>Select category ...</option>
                    <option value="Loadingissue">Loadingissue</option>
                    <option value="Display error">Display error</option>
                </select>
                <span id="categoryCorr" class="corr">Please select category</span>

                <label for="description">Description *</label>
                <textarea id="description" autocomplete="off" rows="5" cols="50" name="description"
                    placeholder="Describe the problem..."></textarea>
                <span id="descriptionCorr" class="corr">Please describe the problem</span>

                <p>By submitting this form you agree to our terms and conditions and our Privacy Policy which explains how
                    we may collect, use and disclose your personalinformation including to third parties.</p>
                <p>* Required</p>
                <input type="submit" value="Submit">
            </form>
        </div>
    </div>
    `;
