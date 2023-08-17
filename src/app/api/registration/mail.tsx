export const Mail = (name: string) => {
  return (
    <>
      <h1>{name}, Thank you for registration for BIOCON 2023!</h1>
      <p>Dear {name},</p>
      <p>
        On behalf of the Organizing Committee, we are excited to welcome you to
        BIOCON: an international conference on industrial biotechnology held in
        the marvelous city of Almetyevsk, Republic of Tatarstan!
      </p>
      <p>
        Over three days, December 18th—20th 2023, you will have the opportunity
        to share innovative ideas, research results, and experiences with
        like-minded biotech enthusiasts from around the world.
      </p>
      <p>
        TED-style plenary talks from world-renowned researchers, parallel
        sessions on major spheres of biotechnology headlined by recognized
        keynote speakers, an exciting Science Slam and much more — all infused
        with unforgettable culture of Tatarstan — BIOCON, in one word.
      </p>
      <p>We have collected some BIOCON trivia for our guests:</p>
      <ul>
        <li>The floor language is English;</li>
        <li>No registration fee is applied to any types of participants;</li>
        <li>
          We only offer offline participation in an attempt to bring back the
          unique international conference vibe;
        </li>
        <li>
          The program will soon be available at{" "}
          <a href="https://biocon.international/">biocon.international</a>;
        </li>
        <li>Travel expenses are covered by the participants;</li>
        <li>
          flight & hotel recommendations will also follow soon on the official
          website;
        </li>
        <li>
          We will happily provide professional visa support for all participants
          if needed as well as a conference invitation letter
        </li>
      </ul>
      <p>
        Our managers will contact you in due time in order to guide you towards
        BIOCON:
      </p>
      <p style={{ marginBottom: 0 }}>
        <strong>Domestic support</strong>
      </p>
      <p style={{ margin: 0 }}>Elizaveta Punchenko</p>
      <a style={{ marginTop: 0 }} href="mailto:punchenko@itmo.ru">
        punchenko@itmo.ru
      </a>
      <p style={{ marginBottom: 0 }}>
        <strong>International support</strong>
      </p>
      <p style={{ margin: 0 }}>Sofia Antipova</p>
      <a style={{ marginTop: 0 }} href="mailto:antipova@itmo.ru">
        antipova@itmo.ru
      </a>
      <p style={{ textAlign: "center" }}>See you at BIOCON 2023!</p>
    </>
  );
};
