declare namespace FormTypes {
  interface SignUpForm {
    given_name: string
    email: string
    password: string
    confirmpassword: string
  }
  interface SignInForm {
    email: string
    password: string
  }
  interface ForgotPassword {
    email: string
    username: string
  }
}
