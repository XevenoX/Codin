import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import EditableText from '../../EditableText';

const Overview = () => {
    const [about, setAbout] = useState("At Codefive, we are committed to exceeding expectations by providing customized solutions that drive the growth and success of our clients. From tailor-made software development to the creation of unique websites, to the implementation of digital marketing strategies, we are here to help businesses achieve their goals from start to finish. With a highly skilled and passionate multidisciplinary team, we are ready to tackle any challenge and deliver exceptional results. Our commitment is to excellence and the success of our clients.");
    const [website, setWebsite] = useState("https://codefive.pt");
    const [industry, setIndustry] = useState("Software Development");
    const [companySize, setCompanySize] = useState("2-10 employees");
    const [specialties, setSpecialties] = useState("Wordpress, Mautic, SMS Marketing, Email Marketing, Software, UX/UI, Web Design, Websites, RGPD, Mautic, Marketing, SEO, Software, and E-commerce");

    const handleChange = setter => e => setter(e.target.value);

    return (
        <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                About us
            </Typography>
            <EditableText type={0} label="About" value={about} onChange={handleChange(setAbout)} multiline={true} />
            <EditableText type={1} label="Website" value={website} onChange={handleChange(setWebsite)} />
            <EditableText type={1} label="Industry" value={industry} onChange={handleChange(setIndustry)} />
            <EditableText type={1} label="Company size" value={companySize} onChange={handleChange(setCompanySize)} />
            <EditableText type={1} label="Specialties" value={specialties} onChange={handleChange(setSpecialties)} multiline={true} />
        </Box>
    );
};

export default Overview;