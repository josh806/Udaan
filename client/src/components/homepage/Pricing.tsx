import React from 'react';
const Pricing = function () {
  return (
    <>
      <div id = 'Pricing_container'>
        <div className='Features_content_container'>
          <h1>Pricing</h1>
          <div className='pricing_elements'>
            <div className='element_1'>
              <div className='title'>Individual</div>
              <div className='inner'>
                <div className='price'>4.99 Euro/month</div>
                <div className='price_description'>Try free for 45 days. Cancel anytime.</div>
                <div className='price_advantage'>
                  <p>1 teacher</p>
                  <p>Unlimited students</p>
                </div>
                <div className='join_button'>
                  <button>Join</button>
                </div>
              </div>
            </div>
            <div className='element_2'>
              <div className='title'>Small School</div>
              <div className='inner'>
                <div className='price'>29.99 Euro/month</div>
                <div className='price_description'>Try free for 45 days. Cancel anytime.</div>
                <div className='price_advantage'>
                  <p>Unlimited teachers</p>
                  <p>Up to 200 students</p>
                </div>
                <div className='join_button'>
                  <button>Join</button>
                </div>
              </div>
            </div>
            <div className='element_3'>
              <div className='title'>Large School</div>
              <div className='inner'>
                <div className='price'>49.99 Euro/month</div>
                <div className='price_description'>Try free for 45 days. Cancel anytime.</div>
                <div className='price_advantage'>
                  <p>Unlimited teachers</p>
                  <p>Unlimited students</p>
                </div>
                <div className='join_button'>
                  <button>Join</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Pricing;
