<template>
  <div class="section section-about-us">
    <div class="container">
      <div class="row">
        <div class="col-md-8 ml-auto mr-auto text-center">
          <h2 class="title">Purchase Policy</h2>
        </div>
      </div>
      <el-card :body-style="{ padding: '35px' }">
        <h5 class="mt-0">Currency</h5>
        <p class="blockquote">
          All ticket prices for events that occur in Egyptian Pounds (EGP)
        </p>
        <h5 class="mt-0">Payment Methods</h5>
        <p class="blockquote">
          We accepts all payment methods to accommodate your needs. Including
          online payments and we accept all kind of Visa and MasterCard.
        </p>
        <h5 class="mt-0">Pricing and Availability</h5>
        <p class="blockquote">
          We act as an agent for event organizers; thus, we do not control
          ticket prices. Typically, tickets selling is always provided through
          our website TheGateegy.com or curtain locations and venders, depends
          on the occasion or deal with the event organizers.  Commonly, all of
          these points have access to the same ticketing system. Tickets for
          popular events may consequently go on sale soon. Prior to the event,
          more tickets may become available. The availability of tickets is not
          under our own control.
        </p>
        <h5 class="mt-0">Order Confirmation</h5>
        <p class="blockquote">
          After you finish booking your ticket, a Confirmation page will appear,
          and a confirmation mail will be sent to the mail you had put while
          filling your info. You are responsible to contact us if any problem
          occurred like not receiving a confirmation mail. Only you can
          recognize any problem that may occur during your purchasing process.

          For curtain events we do some heavy selection. As a result in those
          events you may reserve, pay for your ticket and receive an email with
          your QR-Code to the event but you’ll still be on pending till we
          confirm. In case you’re reservation wasn’t confirmed we will
          automatically deactivate your QR-Code and refund your money with in 24
          hours. An email will be send to you in this case.
        </p>
        <h5 class="mt-0">Receiving your tickets</h5>
        <p class="blockquote">
          In The Gate we started using new Smart ticketing system by receiving a
          QR-code as your ticket. After Finishing your billing process, you’ll
          have the option to download your QR-code in the same page as the
          confirmation message mentioned in the previous policy (Order
          confirmation). This QR-code will contain the reservation info and name
          of the person reserved and payed for this ticket. You will also
          receive an attachment with the Qr-code in the confirmation mail.
        </p>
        <h5 class="mt-0">Refunds and Exchanges</h5>
        <p class="blockquote">
          Policies set by our clients (event planners and organizers) that The
          Gate will typically offer a replacement or refund after the purchase
          of the ticket, or for lost, stolen or damaged tickets. It is
          prohibited. Therefore, it is advisable to carefully check the event
          dates and seat selection.
        </p>
        <h5 class="mt-0">Billing Information Verification</h5>
        <p class="blockquote">
          Your order will only be processed and completed after all billing
          information has been confirmed. You may receive incorrect credit card
          account information. This delays ticket processing and delivery. In
          this case, we will try Once or Twice only to contact you using the
          info you shared with us while reserving your ticket. If we can’t get
          it touch with you after, your order may be canceled, and your ticket
          may be sold to others without notice.
        </p>
        <h5 class="mt-0">Ticket restrictions</h5>
        <p class="blockquote">
          "Ticket restrictions" are applied to each event to prevent unjustified
          ticket purchasing practices (black market). This amount is written to
          the event page and is checked by the system for every transaction. You
          can’t purchase more than the specified number of tickets mentioned in
          the event page. In case reserving more than one ticket, the person
          reserving must fill some personal info of the person or people he is
          buying the extra ticket/s for such as name and email. In this case,
          The QR-code will hold the name of the person who reserved the ticket
          and the name of the person this ticket if for.
        </p>
      </el-card>
    </div>
  </div>
</template>

<script>
import { Card } from "element-ui";

export default {
  components: {
    [Card.name]: Card,
  },
};
</script>

<style scoped>
.blockquote {
  font-weight: 500;
}
</style>
