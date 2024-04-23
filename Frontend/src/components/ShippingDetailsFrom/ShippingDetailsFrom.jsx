import React from 'react';
import { Grid } from '@mui/material';
import { StyledTextField } from '../../assets/theme/theme';
import style from './ShippingDetailsFrom.module.scss';
import { CustomButton } from '../Shared';
import { SCREEN_MODES } from '../../utilities/app.constants';
const ShippingDetailsFrom = ({ shippingData, handleInputFocus, onInputHandleChange,isCart,onCallback,helperText, ScreenMode }) => {
    const { fullName,email, addressLine1, addressLine2, city, postalCode, country, phoneNumber,cancelButtonTitle,confirmButtonTitle } = shippingData;

    return (
        <section className={style.FormContainer}>
        <Grid container spacing={4}>
            {/* Full Name */}
            <Grid item xs={12} md={12} sx={{ marginTop: '1rem' }}>
                <StyledTextField
                    fullWidth
                    label="Full Name"
                    placeholder="Enter Full Name"
                    size="small"
                    value={fullName.value}
                    error={!!fullName.error}
                    disabled={fullName.disable}
                    required={fullName.isRequired}
                    helperText={helperText && fullName.error}
                    onFocus={() => handleInputFocus('fullName', 'GI')}
                    onChange={(event) => onInputHandleChange('fullName', event.target.value)}
                />
            </Grid>
             {/*email */}
             <Grid item xs={12} md={12}>
                <StyledTextField
                    fullWidth
                    label="Email"
                    placeholder="Enter Email"
                    size="small"
                    value={email.value}
                    error={!!email.error}
                    disabled={email.disable}
                    required={email.isRequired}
                    helperText={helperText && email.error}
                    onFocus={() => handleInputFocus('email', 'GI')}
                    onChange={(event) => onInputHandleChange('email', event.target.value)}
                />
            </Grid>
            {/* Address Line 1 */}
            <Grid item xs={12} md={12}>
                <StyledTextField
                    fullWidth
                    label="Address Line 1"
                    placeholder="Enter Address Line 1"
                    size="small"
                    value={addressLine1.value}
                    error={!!addressLine1.error}
                    disabled={addressLine1.disable}
                    required={addressLine1.isRequired}
                    helperText={helperText && addressLine1.error}
                    onFocus={() => handleInputFocus('addressLine1', 'GI')}
                    onChange={(event) => onInputHandleChange('addressLine1', event.target.value)}
                />
            </Grid>
            {/* Address Line 2 */}
            <Grid item xs={12} md={12}>
                <StyledTextField
                    fullWidth
                    label="Address Line 2"
                    placeholder="Enter Address Line 2"
                    size="small"
                    value={addressLine2.value}
                    error={!!addressLine2.error}
                    disabled={addressLine2.disable}
                    required={addressLine2.isRequired}
                    helperText={helperText && addressLine2.error}
                    onFocus={() => handleInputFocus('addressLine2', 'GI')}
                    onChange={(event) => onInputHandleChange('addressLine2', event.target.value)}
                />
            </Grid>
            {/* City */}
            <Grid item xs={12} md={4}>
                <StyledTextField
                    fullWidth
                    label="City"
                    placeholder="Enter City"
                    size="small"
                    value={city.value}
                    error={!!city.error}
                    disabled={city.disable}
                    required={city.isRequired}
                    helperText={helperText && city.error}
                    onFocus={() => handleInputFocus('city', 'GI')}
                    onChange={(event) => onInputHandleChange('city', event.target.value)}
                />
            </Grid>
            {/* Postal Code */}
            <Grid item xs={12} md={4}>
                <StyledTextField
                    fullWidth
                    label="Postal Code"
                    placeholder="Enter Postal Code"
                    size="small"
                    value={postalCode.value}
                    error={!!postalCode.error}
                    disabled={postalCode.disable}
                    required={postalCode.isRequired}
                    helperText={helperText && postalCode.error}
                    onFocus={() => handleInputFocus('postalCode', 'GI')}
                    onChange={(event) => onInputHandleChange('postalCode', event.target.value)}
                />
            </Grid>
            {/* Country */}
            <Grid item xs={12} md={4}>
                <StyledTextField
                    fullWidth
                    label="Country"
                    placeholder="Enter Country"
                    size="small"
                    value={country.value}
                    error={!!country.error}
                    disabled={country.disable}
                    required={country.isRequired}
                    helperText={helperText && country.error}
                    onFocus={() => handleInputFocus('country', 'GI')}
                    onChange={(event) => onInputHandleChange('country', event.target.value)}
                />
            </Grid>
            {/* Phone Number */}
            <Grid item xs={12} md={6}>
                <StyledTextField
                    fullWidth
                    label="Phone Number"
                    placeholder="Enter Phone Number"
                    size="small"
                    value={phoneNumber.value}
                    error={!!phoneNumber.error}
                    disabled={phoneNumber.disable}
                    required={phoneNumber.isRequired}
                    helperText={helperText && phoneNumber.error}
                    onFocus={() => handleInputFocus('phoneNumber', 'GI')}
                    onChange={(event) => onInputHandleChange('phoneNumber', event.target.value)}
                />
            </Grid>
          
           <Grid item xs={12} md={12}>
         {!isCart && (<> <CustomButton text={cancelButtonTitle ? cancelButtonTitle : 'Cancel'} border='1px solid #ffe4d9' bgColor='#ff8884' onClick={() => onCallback(false)} />
             {!(ScreenMode=== SCREEN_MODES.VIEW) &&  <CustomButton text={confirmButtonTitle ? confirmButtonTitle : 'Confirm'} onClick={() => onCallback(true)}/>}
            </>
         )
            }
            </Grid>
            
        </Grid>
        </section>
    );
};

export default ShippingDetailsFrom;
