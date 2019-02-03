# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true, null: false, unique:true|
|email|string|null: false, unique:true|
|password|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: :members
- has_many :members


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|stirng|null: false|


### Association
- has_many :messages
- has_many :users, through: :members
- accepts_nested_attributes_for :member


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null:false, foreign_key: true|
|group_id|integer|null:false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

