<template>
    <div class="container">
         <div class="signupForm">
            <form>
                <h2>Sign In</h2>
                <div class="form-group">
                    <input type="email" class="form-control" name="email" placeholder="Email Address" required="required">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" name="password" placeholder="Password" required="required">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" name="confirm_password" placeholder="Confirm Password" required="required">
                </div>        
                <div class="form-group">
                    <button type="submit" class="btn btn-outline-primary btn-lg">Sign In</button>
                </div>
            </form>
        </div>
   
    </div>
</template>

<script>
export default {
    name: 'signIn'
}
</script>

<style scoped>
    .signupForm {
		width: 425px;
		margin: 0 auto;
		padding: 30px 0;
	}
    form {
    	margin-bottom: 15px;
        background: #fff;
		border: 1px solid #f4f4f4;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 40px 50px;
    }
	.form-control {
        min-height: 41px;
		box-shadow: none;
		border-color: #e6e6e6;
	}
	.form-control:focus {
		/* border-color: #00c1c0; */
        border-color: rgb(21,127,251);
	}
	h2 {
		color: #333;
		font-weight: bold;
        margin: 0 0 25px;
    }

	.form-group {
		margin-bottom: 20px;
	}
	label {
		font-weight: normal;
		font-size: 13px;
	}
    .btn {        
        font-size: 16px;
        font-weight: bold;
		min-width: 140px;
        outline: none !important;
        border-radius: 3px;
    }
</style>


