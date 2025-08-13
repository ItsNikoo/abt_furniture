from django import forms

class ContactForm(forms.Form):
    phone = forms.CharField(max_length=20, label='Номер телефона')
    comment = forms.CharField(required=False, label='Комментарий', widget=forms.Textarea)
    product = forms.CharField(max_length=100, required=False, label='Продукт')
    consent = forms.BooleanField(
        label='Согласие на обработку персональных данных',
        required=True,
        error_messages={'required': 'Необходимо дать согласие на обработку данных'}
    )