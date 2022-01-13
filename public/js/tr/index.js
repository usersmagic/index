window.onload = () => {
  const startPageJoinWaitlistButton = {
    x: document.getElementById('start-page-join-waitlist-button').getBoundingClientRect().left,
    y: document.getElementById('start-page-join-waitlist-button').getBoundingClientRect().top,
    width: document.getElementById('start-page-join-waitlist-button').offsetWidth,
    height: document.getElementById('start-page-join-waitlist-button').offsetHeight
  };

  document.querySelector('.all-content-wrapper').addEventListener('scroll', event => {
    document.querySelector('.all-header-wrapper').style.borderBottomColor = `rgba(254, 254, 254, ${Math.min(event.target.scrollTop, window.innerHeight) / window.innerHeight * 0.2})`;
    document.querySelector('.all-header-wrapper').style.boxShadow = `0 0 5px rgba(254, 254, 254, ${Math.min(event.target.scrollTop, window.innerHeight) / window.innerHeight * 0.2})`;
  });

  document.addEventListener('click', event => {
    if (event.target.classList.contains('all-header-logo') || (event.target.parentNode && (event.target.parentNode.classList.contains('all-header-logo')))) {
      document.location.reload();
    }

    if (event.target.classList.contains('join-waitlist-button') || (event.target.parentNode && (event.target.parentNode.classList.contains('join-waitlist-button')))) {
      document.getElementById('join-waitlist-scroll-place').scrollIntoView();
    }

    if (event.clientX >= startPageJoinWaitlistButton.x && event.clientX <= startPageJoinWaitlistButton.x + startPageJoinWaitlistButton.width && event.clientY >= startPageJoinWaitlistButton.y && event.clientY <= startPageJoinWaitlistButton.y + startPageJoinWaitlistButton.height && window.innerHeight - document.querySelector('.all-content-wrapper').scrollTop > event.clientY) {
      document.getElementById('join-waitlist-scroll-place').scrollIntoView();
    }
  });

  document.addEventListener('mousemove', event => {
    if (event.clientX >= startPageJoinWaitlistButton.x && event.clientX <= startPageJoinWaitlistButton.x + startPageJoinWaitlistButton.width && event.clientY >= startPageJoinWaitlistButton.y && event.clientY <= startPageJoinWaitlistButton.y + startPageJoinWaitlistButton.height && window.innerHeight - document.querySelector('.all-content-wrapper').scrollTop > event.clientY) {
      document.getElementById('start-page-join-waitlist-button').style.boxShadow = '0 0 15px rgba(46, 197, 206, 0.5)';
      document.querySelector('.all-content-wrapper').style.cursor = 'pointer';
    } else {
      document.getElementById('start-page-join-waitlist-button').style.boxShadow = '0 0 15px rgba(254, 254, 254, 0.2)';
      document.querySelector('.all-content-wrapper').style.cursor = 'default';
    }
  });
}
