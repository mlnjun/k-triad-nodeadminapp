// 관리자 웹사이트 관리자계정정보 관리 용

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'member',
    {
      member_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '사용자 고유 번호',
      },
      email: { type: DataTypes.STRING(100), allowNull: false, comment: '이메일 주소' },
      member_password: { type: DataTypes.STRING(500), allowNull: false, comment: '비밀번호' },
      name: { type: DataTypes.STRING(100), allowNull: false, comment: '이름' },
      profile_img_path: { type: DataTypes.STRING(100), allowNull: true, comment: '프로필 이미지 경로' },
      telephone: { type: DataTypes.STRING(20), allowNull: false, comment: '전화번호' },
      entry_type_code: { type: DataTypes.TINYINT, allowNull: false, comment: '가입 유형 코드' },
      use_state_code: { type: DataTypes.TINYINT, allowNull: false, comment: '가입 상태 코드' },
      birth_date: { type: DataTypes.DATE, allowNull: false, comment: '생년월일' },
      reg_date: { type: DataTypes.DATE, allowNull: false, comment: '등록자고유번호' },
      reg_member_id: { type: DataTypes.INTEGER, allowNull: false, comment: '등록일시' },
      edit_date: { type: DataTypes.DATE, allowNull: true, comment: '수정일시' },
      edit_member_id: { type: DataTypes.INTEGER, allowNull: true, comment: '수정자고유번호' },
    },
    {
      sequelize,
      tableName: 'member',
      timestamps: false,
      comment: '사용자계정정보',
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'member_id' }],
        },
      ],
    },
  );
};
