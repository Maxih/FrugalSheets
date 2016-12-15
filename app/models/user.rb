class User < ApplicationRecord
  attr_reader :password

	validates :email, :password_digest, :session_token, :firstname, :lastname, presence: true
	validates :email, uniqueness: true
	validates :password, length: {minimum: 6}, allow_nil: :true

	after_initialize :ensure_session_token

  has_many :authored_documents,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :Document

  has_many :owned_groups,
    primary_key: :id,
    foreign_key: :owner_id,
    class_name: :Group


  has_many :user_groups
  has_many :groups, through: :user_groups
  # has_many :documents, through: :groups
  has_many :documents, -> { select("documents.id, documents.name, documents.updated_at, groups.id AS group_id, groups.name AS group_name")}, through: :groups

	def password= password
		self.password_digest = BCrypt::Password.create(password)
		@password = password
	end

	def self.find_by_credentials email, password
		user = User.find_by(email: email)
		return nil unless user
		user.password_is?(password) ? user : nil
	end

	def password_is? password
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = new_session_token
		self.save
		self.session_token
	end

	private

	def ensure_session_token
		self.session_token ||= new_session_token
	end

	def new_session_token
		SecureRandom.base64
	end
end
