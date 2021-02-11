
  export const template =
    `
    <div class="notifications-container">
      <div class="top">
        <h1>Notifications</h1>
        <ion-icon class="closePopups" name="close-circle"></ion-icon>
      </div>
      <div class="bottom">
        <div class="noti-row">
          <h2 class="noti-row-text">2 new invites</h2>
          <ion-icon id="noti-row-arrow" name="chevron-forward-outline"></ion-icon>
        </div>
      </div>
    </div>

    <div class="invites-container">
      <div class="top">
        <h1>Invites</h1>
      </div>
      <div class="bottom">
        <div class="invites-row">
          <div class="invites-row-left">
            <div class="invites-picture"></div>
          </div>
          <div class="invites-row-middle">
            <h2 class="invites-presentation">Presentation</h2>
            <h2 class="invites-owner">Lukas Friesenecker</h2>
          </div>
          <div class="invites-row-right">
            <button class="invites-accept"><ion-icon name="close-outline"></ion-icon></button>
            <button class="invites-decline"><ion-icon name="checkmark-outline"></ion-icon></button>
          </div>
        </div>

        <div class="invites-row">
          <div class="invites-row-left">
            <div class="invites-picture"></div>
          </div>
          <div class="invites-row-middle">
            <h2 class="invites-presentation">Presentation</h2>
            <h2 class="invites-owner">Lukas Friesenecker</h2>
          </div>
          <div class="invites-row-right">
            <button class="invites-accept"><ion-icon name="close-outline"></ion-icon></button>
            <button class="invites-decline"><ion-icon name="checkmark-outline"></ion-icon></button>
          </div>
        </div>
      </div>
    </div>
    `;
