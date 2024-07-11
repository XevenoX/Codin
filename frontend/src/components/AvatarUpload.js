import React, { useState, useEffect } from 'react';
import { Avatar } from "@files-ui/react";
import axios from 'axios';

const AvatarUpload = ({ userInfo, width, height, variant }) => {
    const [avatar, setAvatar] = useState(null);

    function compressImage(base64, maxWidth, maxHeight, quality = 0.7) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = base64;
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedBase64);
            };
            img.onerror = (error) => {
                reject(error);
            };
        });
    }

    const handleChangeSource = async (selectedFile) => {
        setAvatar(selectedFile);
        if (selectedFile.size > 1 * 1024 * 1024) { // 1 MB limit
            alert('File size exceeds 1 MB');
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async () => {
            const base64data = reader.result;
            const compressedBase64 = await compressImage(base64data, 1000, 1000);
            axios.post('/userInfo/updateAvatar', { email: userInfo.email, avatar: compressedBase64 })
                .catch(error => {
                    console.error("There was an error uploading the image!", error);
                });
        };
    };

    useEffect(() => {
        if (userInfo.avatar) {
            setAvatar(userInfo.avatar);
        } else {
            setAvatar('/default_avatar.jpg');
        }
    }, [userInfo.avatar]);

    return (
        <div>
            <Avatar
                src={avatar}
                onChange={handleChangeSource}
                variant={variant}
                changeLabel='click to upload'
                style={{
                    width: width, height: height
                }}
            />
        </div>
    );
};

export default AvatarUpload;