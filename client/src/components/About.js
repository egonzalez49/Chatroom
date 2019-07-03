import React from 'react';

const About = () => {
  return (
    <div
      style={{
        position: 'relative',
        marginTop: '200px',
        paddingBottom: '200px'
      }}
      className="px-5 text-center"
    >
      <h2 id="about">What is chatroom?</h2>
      <p>
        This is a website dedicated to creating chat rooms allowing people to
        interact with each other in real time!
      </p>
      <p>
        This website was created using the MERN stack; MongoDB for the database,
        Express for the server, React+Redux for the frontend, and NodeJs for the
        backend.
      </p>
      <p>
        As a means of real-time updating in the frontend, the website uses the
        PusherJS library.
      </p>
      <img
        alt="mern stack"
        src="https://res.cloudinary.com/chatroom/image/upload/v1562092316/mern_who5di.png"
      />
    </div>
  );
};

export default About;
