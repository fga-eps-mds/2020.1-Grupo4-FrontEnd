import React from 'react';
import PropTypes from 'prop-types';
import { Page, Text, Image, View, Document } from '@react-pdf/renderer';
import LOGO from '../../../../assets/images/minademyLogo.png';
import styles from './styles';

const CertificateTemplate = ({ certificateData, image }) => {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.certificate}>
            <View style={styles.certificate.header}>
              {image ? (
                <img
                  src={LOGO}
                  alt="logo"
                  style={styles.certificate.header.logo}
                />
              ) : (
                <Image style={styles.certificate.header.logo} src={LOGO} />
              )}
              <Text style={styles.certificate.header.title.emphasis}>
                {certificateData?.courseType === 'Learner'
                  ? 'Certificado de Conclusão de Tutorial'
                  : 'Certificado de Mentoria'}
              </Text>
            </View>

            <View style={styles.certificate.body}>
              <Text style={styles.certificate.content}>Certificamos que</Text>
              <Text style={styles.certificate.content.emphasis}>
                {certificateData?.user.name} {certificateData?.user.lastname}
              </Text>
              <Text style={styles.certificate.content}>
                {certificateData?.courseType === 'Learner'
                  ? 'finalizou com sucesso o tutorial da Minacademy.'
                  : 'prestou mentoria voluntária na plataforma Minacademy.'}
              </Text>
            </View>

            <View style={styles.certificate.footer}>
              <View style={styles.certificate.footer.column}>
                <Text style={styles.certificate.footer.column.content}>
                  Emitido em
                </Text>
                <Text style={styles.certificate.footer.column.content.emphasis}>
                  {certificateData?.createdAt}
                </Text>
              </View>
              <View style={styles.certificate.footer.column}>
                <Text style={styles.certificate.footer.column.content}>
                  Curso
                </Text>
                <Text style={styles.certificate.footer.column.content.emphasis}>
                  Django
                </Text>
              </View>

              {certificateData?.assignedPartner ? (
                <View style={styles.certificate.footer.column}>
                  <Text style={styles.certificate.footer.column.content}>
                    {certificateData?.courseType === 'Learner'
                      ? 'Mentor'
                      : 'Aprendiz'}
                  </Text>
                  <Text style={{...styles.certificate.footer.column.content.emphasis, textTransform: 'capitalize'}}>
                    {certificateData?.assignedPartner?.name}{' '}
                    {certificateData?.assignedPartner?.lastname}
                  </Text>
                </View>
              ) : null}

            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
/* eslint-disable react/require-default-props */
CertificateTemplate.propTypes = {
  certificateData: PropTypes.oneOfType([PropTypes.object]),
  image: PropTypes.bool,
};

export default CertificateTemplate;
