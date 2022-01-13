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
      document.getElementById('email-input').focus();
    }

    if (event.clientX >= startPageJoinWaitlistButton.x && event.clientX <= startPageJoinWaitlistButton.x + startPageJoinWaitlistButton.width && event.clientY >= startPageJoinWaitlistButton.y && event.clientY <= startPageJoinWaitlistButton.y + startPageJoinWaitlistButton.height && window.innerHeight - document.querySelector('.all-content-wrapper').scrollTop > event.clientY) {
      document.getElementById('join-waitlist-scroll-place').scrollIntoView();
      document.getElementById('email-input').focus();
    }
  });

  if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
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

  document.addEventListener('submit', event => {
    if (event.target.id == 'join-waitlist-form') {
      event.preventDefault();
      
      const email = document.getElementById('email-input').value.trim();
      const name = document.getElementById('name-input').value.trim();
      const companyName = document.getElementById('company-name-input').value.trim();
      const companyURL = document.getElementById('company-url-input').value.trim();
      const details = document.getElementById('details-input').value.trim();

      const error = document.getElementById('waitlist-form-error');
      const success = document.getElementById('waitlist-form-success');

      error.innerHTML = '';
      success.innerHTML = '';

      if (!email || !email.length)
        return error.innerHTML = 'Please write your email.';

      if (!name || !name.length)
        return error.innerHTML = 'Please write your name.';

      if (!companyName || !companyName.length)
        return error.innerHTML = 'Please write your company\'s name.';

      if (!companyURL || !companyURL.length)
        return error.innerHTML = 'Please write your company\'s website url.';

      serverRequest('/waitlist', 'POST', {
        email,
        name,
        company_name: companyName,
        company_url: companyURL,
        details: details && details.length ? details : null
      }, res => {
        if (res.success)
          return success.innerHTML = 'Thank you for joining the waitlist! Our team will reach you within 24h.'
        
        if (res.error == 'email_validation')
          return error.innerHTML = 'Please write a valid email address.';

        if (res.error == 'bad_request')
          return error.innerHTML = 'Please complete all the required fields.';

        if (res.error == 'duplicated_unique_field')
          return error.innerHTML = 'This email address is already registered. Please wait our team to contact you. Thank you.';

        return error.innerHTML = 'An unknown error occcured, please try again later.';
      });
    }
  });
}
