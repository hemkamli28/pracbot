# #SECRET KEY: b'ADEDMoXsv81lpe7x3wl5d1sbhOzmNQbcCqm9AeiT4FM='

# from cryptography.fernet import Fernet

# # Generate a key for encryption and decryption
# def generate_key():
#     return Fernet.generate_key()

# # Encrypt a message using a key
# def encrypt_message(message, key):
#     cipher_suite = Fernet(key)
#     encrypted_message = cipher_suite.encrypt(message.encode())
#     return encrypted_message

# # Decrypt an encrypted message using a key
# def decrypt_message(encrypted_message, key):
#     cipher_suite = Fernet(key)
#     decrypted_message = cipher_suite.decrypt(encrypted_message).decode()
#     return decrypted_message

# # Example usage
# if __name__ == "__main__":
#     # Generate a key
#     key = generate_key()
#     print("Generated Key:", key)

#     # Message to encrypt
#     message = "Hello, world!"

#     # Encrypt the message
#     encrypted_message = encrypt_message(message, key)
#     print("Encrypted Message:", encrypted_message)

#     # Decrypt the message
#     decrypted_message = decrypt_message(encrypted_message, key)
#     print("Decrypted Message:", decrypted_message)



from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

# Replace this with the same encryption key used in the JavaScript code
encryption_key = b"ADEDMoXsv81lpe7x3wl5d1sbhOzmNQbc"

def decrypt_message(encrypted_text):
    try:
        """
        Decrypts a message encrypted using AES-CBC with PKCS#7 padding.

        Args:
            encrypted_text (bytes): The encrypted message

        Returns:
            str: The decrypted message
        """
        # Split the encrypted message into IV and ciphertext
        iv = encrypted_text[:16]
        ciphertext = encrypted_text[16:]

        # Decrypt the ciphertext
        cipher = AES.new(encryption_key, AES.MODE_CBC, iv)
        decrypted_text = cipher.decrypt(ciphertext)

        # Remove padding
        return unpad(decrypted_text, AES.block_size).decode('utf-8')
    except ValueError as e:
        if "padded to 16 byte boundary" in str(e):
            print("Warn: Encrypted message is missing padding.")
            return None
        else:
            raise e

# Example usage
encrypted_message = b"abb5d9e3efbc1c214766f17dac1a136cU2FsdGVkX19J9qZdYM/nNtNmsHz8OnPUBIjuQEE6J+E="
decrypted_message = decrypt_message(encrypted_message)

print(decrypted_message)